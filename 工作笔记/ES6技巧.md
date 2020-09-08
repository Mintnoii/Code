# ES6技巧

## 强制要求参数

ES6提供了默认参数值机制，允许你为参数设置默认值，防止在函数被调用时没有传入这些参数。

```javascript
const required = () => {throw new Error('Missing parameter')};

const add = (a = required(), b = required()) => a + b; add(1, 2) //3
add(1) // Error: Missing parameter.
```

而在这个例子中，我们写了一个required()函数作为参数a和b的默认值。这意味着如果a或b其中有一个参数没有在调用时传值，会默认required()函数，然后抛出错误。

## 对象解构

### 1. 删除不需要的属性

有时候你可能不希望保留某些对象属性，也许是因为它们包含敏感信息或仅仅是太大了（just too big）。你可能会枚举整个对象然后删除它们，但实际上只需要简单的将这些无用属性赋值给变量，然后把想要保留的有用部分作为剩余参数就可以了。

```javascript
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};

console.log(cleanObject); // {el1: '1', el2: '2', el3: '3'}
```

上面的代码里，如果希望删除_internal和tooBig参数，我们可以把它们赋值给internal和tooBig变量，然后在cleanObject中存储剩下的属性以备后用即可。

### 2. 在函数参数中解构嵌套对象

在下面的代码中，engine是对象car中嵌套的一个对象。如果我们对engine的vin属性感兴趣，使用解构赋值可以很轻松地得到它。

```javascript
var car = {
 model: 'bmw 2018',
 engine: {
   v6: true,
   turbo: true,
   vin: 12345  
 } 
}
const modelAndVIN = ({model, engine: {vin}}) => {
 console.log(`model: ${model} vin: ${vin}`);
} 
modelAndVIN(car); // => model: bmw 2018  vin: 12345
```

