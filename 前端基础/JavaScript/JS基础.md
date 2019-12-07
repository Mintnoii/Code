## 内置类型

JS中有**7种内置类型** ，这7中类型又分为**6种基本类型(原始类型)和对象**。

ECMAScript 中定义了 6 种基本类型：

- `Number`（`NaN`也属于number）
- `String`
- `Boolean`
- `Null`
- `undefined`
- `Symbol`（ES6 新增）

对象（Object）是引用类型，包括：`Object 类型`、`Array 类型`、`Date 类型`、`RegExp 类型`、`Function `类型，引用类型在使用过程中会经常遇到浅拷贝和深拷贝的问题。

## Typeof

**1.  用`typeof` 来判断基本类型，除了 `null` 都可以显示正确的类型** 

```javascript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
```

`typeof null`结果是`object` ，实际这是`typeof`的一个bug，null是原始类型，而非引用类型

```javascript
typeof null // 'Object'
```

> PS: 为什么会出现这种情况呢？
>
> 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

**2. 用`typeof` 来判断引用类型(对象)，除了函数都显示`Object`**

```javascript
typeof {} // 'Object'
typeof [] // // 'Object'
typeof console.log // 'function'
```

## 类型转换todo

会发生类型转换的几种情况：

**1. 字符串拼接：**

**2. == 操作符：**

**3. 条件判断：**

在进行条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0` 会转换为 `false`，其他所有值都转为 `true`，包括所有对象。

## 原型

几条规则

每个函数都有`prototype`属性，这个属性的值是一个对象（也就是显式原型对象）。

每个对象都有一个`_proto_`属性，该属性指向创建该对象的构造函数的原型。（隐式原型）

对象可以通过 `__proto__` (即它的构造函数的prototype对象)，来寻找不属于该对象的属性，`__proto__` 将对象连接起来组成了原型链。

[详细解释](https://github.com/KieSun/Dream/issues/2)

## new

new  运算符可以为构造函数创建一个实例对象，工作流程：

1. 一个新对象被创建，它继承自构造函数的func.prototype(就是利用 Object.create 方法将 func.prototype 作为新对象的原型对象)
2. 构造函数func被执行，执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例对象。new func 等同于new func()，只能用在不传递任何参数的情况。new func()的优先级比new func的优先级要高。
3. 如果构造函数返回(return)了一个“对象”，那个这个对象会取代new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。

```javascript
// 模拟new运算符工作原理的 new1
var new1 = function(func,value){ // func指令构造函数
    // 1.生成一个新对象，链接到构造函数的原型
    let obj = Object.create(func.prototype)
    // 2.执行构造函数func，绑定this
    let res = func.call(obj,value)// call转移上下文，将其转成新创建的o
    // 3.判断func执行完的结果是不是对象类型，返回新对象
    return typeof res === 'Object'?:obj
}
```

