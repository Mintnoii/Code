# ES6技巧

## 强制要求参数

ES6提供了默认参数值机制，允许你为参数设置默认值，防止在函数被调用时没有传入这些参数。

```javascript
const required = () => {throw new Error('Missing parameter')};

const add = (a = required(), b = required()) => a + b; add(1, 2) //3
add(1) // Error: Missing parameter.
```

而在这个例子中，我们写了一个required()函数作为参数a和b的默认值。这意味着如果a或b其中有一个参数没有在调用时传值，会默认required()函数，然后抛出错误。