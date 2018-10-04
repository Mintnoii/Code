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



