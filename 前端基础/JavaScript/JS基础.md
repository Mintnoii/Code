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

