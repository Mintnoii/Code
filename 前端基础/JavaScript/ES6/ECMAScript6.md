## 1. 新的声明方式

### let/const（常用）

`let`，`const`用于声明变量，用来替代之前的 `var`关键字，与var(可以重复声明，无法限制修改，没有块级作用域)不同的是，let/const会创建一个块级作用域（通俗讲就是一个花括号内是一个新的作用域）。

```javascript
{
    let x = 0
}
{
    let x = 1
}
// 这里外部的console.log(x)拿不到前面2个let在块级作用域内声明的值
console.log(x) // Uncaught ReferenceError: x is not defined
```



> 一个变量有三个操作，声明(提到作用域顶部)，初始化(赋默认值)，赋值(继续赋值)。
> var 是一开始变量声明提升，然后初始化成undefined，代码执行到那行的时候赋值。
> let 是一开始变量声明提升，然后没有初始化分配内存，代码执行到那行初始化，之后对变量继续操作是赋值。因为没有初始化分配内存，所以会报错，这是暂时性死区。
> const 是只有声明和初始化，没有赋值操作，所以不可变。

**关于let和const有没有hoisting：**

1. [Are variables declared with let or const not hoisted in ES6?](https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-not-hoisted-in-es6)
2. [let hoisting?](https://github.com/getify/You-Dont-Know-JS/issues/767)

在日常开发中多存在于使用 **if/for **关键字结合let/const创建的块级作用域，**值得注意的是使用let/const关键字声明变量的for循环和var声明的有些不同**

```javascript
//要实现每隔0.5秒输出0，1，2
for(var i = 0;i<3;i++){
  setTimeout(function(){
    //没有块级作用域
	console.log(i);
    },500)
}
//错误写法：运行结果为 3 3 3
```

