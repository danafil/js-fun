// const totalLimit = Object.entries(feeds).reduce((acc, [ feedId, config ]) => {
// 	return acc + Number(config.num_mentions);}, 0);
// if (totalLimit > 1000) {
// console.log('exceeded total mentions limit of 1000', totalLimit);

// if (orderShowSearch && orderShowSearch.length > 25) {
// 	const totalLimit = Object.entries(feeds).reduce((acc, [ feedId, config ]) => {
// 		return acc + Number(config.num_mentions);}, 0);
// 	console.log('more then 25 lists in', newsletter_name, 'and total mentions', totalLimit, orderShowSearch);
// }

	// FIXME currently there was no misMatch found so maybe this function can be consider as completed
// if (orderShowSearch && orderShowSearch.length > 0) {
// 	const misMatch = Object.keys(feeds).filter(id => !orderShowSearch.includes(id))
// 	if (misMatch.length > 0) {console.log('misMatch!', misMatch);}
// }

// 	if (orderShowSearch && feeds && orderShowSearch.length > 0) {
// 		const misMatch = Object.keys(feeds).filter(id => !orderShowSearch.includes(id))
// 		if (misMatch.length > 0) {console.log('misMatch!', misMatch);}
// 	}

	// const totalForAllLists = Object.entries(feeds).reduce((acc, [k,v]) => {
// 	return acc+Number(v.num_mentions);
// }, 0);
// if (totalForAllLists > 1000) {
// 	console.log(totalForAllLists, feed.feedName, 'totalForAllLists more then 1000');
// }

// Partition implementation
const reports = Object.entries(newsletters).map(([ key, newsletter ]) => {
	// FIXME don't repeat code
	if (!newsletter.feeds) {
		return {
			key,
			reportConfig: {},
			splitedReports: null,
			__orig: newsletter,
		};
	}
	// FIXME check first if feeds belongs to the same project and create report w/ one mention list for that project
	const sortedFeeds = sortFeeds(newsletter.feeds, newsletter.orderShowSearch);
	const partitionedFeeds = partitionFeeds(sortedFeeds);
	// map partitions to report
	const reportConfigs = partitionedFeeds.map((f, i, arr) => {
		const reportName = arr.length === 1 ? newsletter.newsletter_name :
			`${newsletter.newsletter_name}_part_${i}`;
		// FIXME feeds here is an array of {feedId: config} but not an object so need to check if nothing breakes like selection
		const partitionedNewsletter = {...newsletter, feeds: f, newsletter_name: reportName};
		return mapReportConfig(partitionedNewsletter);
	});
	
	return {
		key,
		// FIXME reportConfig is not representing augure report if already was splited
		reportConfig: reportConfigs[0],
		splitedReports: (reportConfigs.length > 1 ? reportConfigs : null),
		__orig: newsletter,
	};
});
