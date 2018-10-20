# JavaScript 常用数组操作方法

## 1. concat()

`concat()` 方法用于连接两个或多个数组。

该方法不会改变现有的数组，仅会返回被连接数组的一个副本。

```javascript
var arr1 = [1, 2, 3]
var arr2 = [4, 5]
var arr3 = arr1.concat(arr2)
cosnole.log(arr1) // [1, 2, 3]
console.log(arr3) // [1, 2, 3, 4, 5]
```

## 2. join()

`join()` 方法用于把数组中的所有元素放入一个字符串。

元素是通过指定的分隔符进行分隔的，默认使用逗号`','`分割，不改变原数组。

```javascript
var arr = [2, 3, 4]
console.log(arr.join()) // "2,3,4"
console.log(arr) //[2, 3, 4]
// 也可以给join()传入其他字符作为分隔符
console.log(arr.join('-')) // "2-3-4"
```

## 3. push()

`push()` 方法可向数组的末尾添加一个或多个元素，并返回新的长度。

末尾添加，返回的是长度，会改变原数组。

```javascript 
var arr = [2, 3, 4]
var result = arr.push(5)
console.log(arr) // [2, 3, 4, 5]
console.log(result) // 4
```

## 4. pop()

`pop()` 方法用于删除并返回数组的最后一个元素。

返回最后一个元素，会改变原数组。

```javascript
var arr = [2, 3, 4]
var result = arr.pop()
console.log(arr) // [2, 3]
console.log(result) // 4
```

## 5. shift()

`shift()` 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。

返回第一个元素，改变原数组。

```javascript
var arr = [2, 3, 4]
var result = arr.shift()
console.log(arr) // [3, 4]
console.log(result) // 2
```

## 6. unshift()

`unshift()` 方法可向数组的开头添加一个或更多元素，并返回新的长度。

返回新长度，改变原数组。

```javascript
var arr = [2, 3, 4]
var result = arr.unshift(1,6)
console.log(arr) // [1, 6, 2, 3, 4]
console.log(result) // 5
```

## 7. slice()

`slice()`方法返回一个新的数组，包含从 start 到 end （不包括返回选定的元素，该方法不会修改原数组。该元素）的 arrayObject 中的元素。

返回选定的元素，该方法不会修改原数组。

```javascript
var arr = [2, 3, 4, 5]
var result = arr.slice(1,3)
console.log(result) // [3, 4]
console.log(arr) // [2, 3, 4, 5]
```

## 8. splice()

`splice(index,howmany,item1,.....,itemX)` 方法可删除从 index 处开始的零个或多个(howmany)元素，使用负数可从数组结尾处规定位置。并且用参数列表中声明的一个或多个值(item)来替换那些被删除的元素。

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

splice() 方法会直接对数组进行修改。

```javascript
// 添加元素的情况
var arr1 = [2, 3, 4, 5]
console.log(arr1.splice(1, 0, 8)) // [2, 8, 3, 4, 5]
console.log(arr1) // [2, 8, 3, 4, 5]
// 删除元素的情况
var arr2 = [6, 7, 8, 9]
console.log(arr2.splice(1, 2, 3)) // [7, 8]
console.log(arr2) // [6, 3, 9]
```

## 9.  substr()和substring()

相同点：如果只是写一个参数

- substr(startIndex)
- substring(startIndex)

两者的作用都一样：都是是截取字符串从当前下标以后直到字符串最后的字符串片段。

```javascript
var str = '123456789'
console.log(str.substr(2)) // '3456789'
console.log(str.substring(2)) // '3456789'
```

不同点：第二个参数

- substr（startIndex,lenth）： 第二个参数是截取字符串的长度（从起始点截取某个长度的字符串）
- substring（startIndex, endIndex）： 第二个参数是截取字符串最终的下标 （截取2个位置之间的字符串,‘含头不含尾’）

```javascript
var str = '123456789'
console.log(str.substr(2,5)) // '34567'
console.log(str.substring(2,5)) // '345'
```

## 10. sort()

按照 Unicode code 位置排序，默认升序：

```javascript
var fruit = ['cherries', 'apples', 'bananas']
fruits.sort() // ['apples', 'bananas', 'cherries']

var scores = [1, 10, 21, 2]
scores.sort() // [1, 10, 2, 21]
```

## 11. reverse()

`reverse()` 方法用于颠倒数组中元素的顺序。

返回的是颠倒后的数组，会改变原数组。

```javascript
var arr = [2, 3, 4]
var result = arr.reverse()
console.log(result) // [4, 3, 2]
console.log(arr) // [4, 3, 2]
```

## 12. indexOf()和lastIndexOf()

都接受两个参数：查找的值、查找起始位置。

不存在，返回 -1 ；存在，返回位置。

indexOf 是从前往后查找， lastIndexOf 是从后往前查找。

**indexOf：**

```javascript
var arr = [2, 5, 8]
arr.indexOf(5) // 1
arr.indexOf(3) // -1

if (arr.indexOf(7) === -1) {
    // element doesn't exist in array
}
```

**lastIndexOf：**

```javascript
var arr = [2, 5, 7, 2]
arr.lastIndexOf(2) // 3
arr.lastIndexOf(6) // -1
arr.lastIndexOf(5, 3) // 从位置3开始向前查找，返回匹配元素的下标 1
arr.lastIndexOf(2, 2) // 0
arr.lastIndexOf(2, -1) // 3
```

## 13. forEach()

遍历数组的每一项，为每个数组元素执行callback函数。

没有返回值，对原数组也没有影响。

```javascript
const arr = [2, 4, 6]
const copy = []

arr.forEach(item => {
    copy.push(item)
})
```

## 14. every()

对数组的每一项都运行给定的函数，每一项都返回 ture，则返回 true。

```javascript
[2, 5, 8, 4].every((element, index, array) => {
    return element < 10
}) // true
```

## 15. some()

对数组的每一项都运行给定的函数，任意一项都返回 ture，则返回 true。

```javascript
function compare(element, index, array) {
    return element > 10
} // true

[2, 4, 5, 3, 8].some(compare) // false
[3, 14, 7, 5].some(compare) // true
```

## 16. filter()

对数组的每一项都运行给定的函数，返回结果为 ture 的项组成的数组。

```javascript
var arr = ['apple', 'pear', 'banana', 'watermelon', 'grapefruit']
var res = arr.filter(function (fruit) {
    fruit.length < 6
})
console.log(res) // ['apple', 'pear']
```

## 17. map()

对数组的每一项都运行给定的函数，返回每次函数调用的结果组成一个新数组。

```javascript
var arr = [2, 4, 6]
var res = arr.map(function (item) {
    return item * 2
})
console.log(res) // [4, 8, 12]
```

