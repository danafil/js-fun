import HashMap from '../dataStructures/hashMap.js';

const s = 'abbc';
const b = 'abcbdfabfcbababcbacghcadfgacbba';

function permutation(str, prefix, list) {
	if (str.length === 0) {
		list.push(prefix);
	}
	else {
		for (let i = 0; i < str.length; i++) {
			const rem = str.substring(0, i) + str.substring(i + 1);
			permutation(rem, prefix + str.charAt(i), list)
		}
	}
}
function getPermutations(str) {
	const permutationList = [];
	permutation(str, '', permutationList);
	console.log('permutationList:', permutationList);
	return permutationList;
}

export default function findPermutations(b, s) {
	for(let i = 0; i <= b.length - s.length; i++) {
		const s1 = b.substring(i, i + s.length);
		//const hashMap = 
		//if (isPermutation(subStr, ))
	}
}

//findPermutations(b, s);
const h = HashMap();
h.add(1, 1)
h.add(2, 2)

console.log(h.get(1))
console.log(h.get(2))
console.log(h.get(3))