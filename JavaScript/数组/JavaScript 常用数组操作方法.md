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

