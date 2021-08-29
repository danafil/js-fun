const edgeList = [ [0,1], [0,6], [0,8], [1,4], [1,6], [1,9], [2,4], [2,6], [3,4], [3,5], [3,8], [4,5], [4,9], [7,8], [7,9] ];
const count = edgeList.length;
console.log(count);

function isSameEdge(edge1, edge2) {
  return edge1.includes(edge2[0]) && edge1.includes(edge2[1]);
}

function hasEdge(graph, edge) {
  return graph.find((e) => isSameEdge(edge, e));
}
console.time('findEdge');
console.log(hasEdge(edgeList, [3,4]));
console.timeEnd('findEdge');

function hasEdgeRecur(graph, edge) {
  if (graph.length === 0) {
    return false;
  } 
  if (isSameEdge(graph[0], edge)) {
    return true;
  }
  return hasEdgeRecur(graph.slice(1), edge);
}

console.time('findEdge2');
console.log(hasEdgeRecur(edgeList, [3,4]));
console.timeEnd('findEdge2');

function getNodes(edgeList) {
  return edgeList.reduce(addUnicToList, []);
}

function addUnicToList(acc, values) {
  return values.reduce((acc, v) => {
    if (!acc.includes(v)) {
      acc.push(v);
    }
    return acc;
  }, acc);
}

// console.log(getNodes(edgeList));

function adjacencyGraph(edgesList) {
	const vertices = getNodes(edgesList);
	vertices.reduce((acc, next) => {
		const listOfAdjacencies = edgesList.filter((edge) => edge.includes(next));
		acc[next] = filterOutDublicated(listOfAdjacencies.flat()).filter(vertice => vertice
		!== next);
		return acc;
	}, {})
}

function convertToObject(acc, next) {
	acc[next] = [];
	return acc;
}

function filterOutDublicated(arr) {
	arr.reduce((acc, next) => {
		if (!acc.includes(next)) {
			acc.push(next);
		}
		return acc;
	}, [])
}

console.log(adjacencyGraph2(edgeList));

function adjacencyGraph2(edgesList) {
	return edgesList.reduce((acc, edge) => {
		const [ vertice1, vertice2 ] = edge;
		acc[vertice1] = !Object.keys(acc).includes(String(vertice1)) ? [vertice2] :
		[ ...acc[vertice1], vertice2 ];
		acc[vertice2] = !Object.keys(acc).includes(vertice2) ? [vertice1] :
		[ ...acc[vertice2], vertice1 ];
		return acc;
	}, {})
}
