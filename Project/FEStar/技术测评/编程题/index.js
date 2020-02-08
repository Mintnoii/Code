/*	给定两个长度相同的整数数组，将其中的数字分别一一配对，
	对每一对数字计算乘积，然后求和，
	计算出总和最小的配对方式，并打印出总和。*/
module.exports = function(arr1, arr2) {
	let min = null;
	if (arr1.length == 0 || arr2.length == 0) {
		return false;
	}
	arr1.sort((a,b)=>a-b;)
	arr2.sort((a,b)=>a-b;)
	arr1.forEach((item,index)=>{
		min += item * arr2[arr2.length - 1 - index];
	})
	console.log(min);
    return min;
}