## React的特点

1. 声明式设计：React采用声明范式，可以轻松描述应用。声明式是告诉计算机要去做什么而不管怎么做，而命令式是要描述如何去做。

   ```js
   // 命令式
   var arr = [1, 2, 3, 4]
   for(var i = 0; i < arr.length; i++){
     arr[i] += 2
   }
   // 声明式
   var arr = [1, 2, 3, 4]
   arr = arr.map((item) => {
     return item += 2
   })
   ```

2. 函数化编程：

   https://www.zhihu.com/question/28292740

   https://zhuanlan.zhihu.com/p/21714695

3. 高效：React通过对DOM的模拟(虚拟dom)，利用diff算法最大限度地减少与DOM的交互。

4. 灵活： React可以与已知的库或框架很好地配合。

5. JSX：JSX是 JavaScript 语法的扩展。

6. 组件：通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。

7. 单向响应的数据流：React 实现了单向响应的数据流，这也是它为什么比传统数据绑定更简单。

## 与Vue框架的对比

 [React与Vue的对比](https://cn.vuejs.org/v2/guide/comparison.html)

- React 约束性比较小，灵活性比较高 (没有指令)  jsx语法
- Vue 约束比较大，灵活度比较低 开发速度快 templates

## 模拟vue语法

- v-text

```react
 let message = "商一璇"
 let Dom = <h3>{message}</h3>
 let Dom = <h3>{1+1}</h3>
 let Dom = <h3>{true?10:20}</h3>
```

- v-html

```react
let message = <h1>标题</h1>
let Dom = <div>{message}</div>
```

- v-bind

```react
let message = "商一璇"
let Dom = <h3 title={message}>{message}</h3>
```

- v-if、v-show

```react
let message = "商一璇"
let Dom = false?<h3 title={message} style={{display:true?"block":"none"}}>{message}</h3>:""
```

- v-for

```react
let arr = ["商一璇","陈剑鸣","王秋爽"]
let Dom = <ul>
      {
        arr.map((item, index) => {
          return <li key={index}>{item}</li>
        })
      }
    </ul>
```

在react中  

- class  需要改变成className

  `let Dom  = <div className="abc">王秋爽</div>`

-  for  需要改变成htmlFor 

  `let Dom = <label htmlFor="11">11</label>`