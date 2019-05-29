[React官网](<https://reactjs.org/docs/getting-started.html>)

React Fiber版本

Vue提供了更丰富了API，实现功能更加简单。但是因为API多，它的灵活性就有一定的限制。而React灵活性更大，在处理非常复杂的业务时，可以选择的技术方案更多。

建议：在做一些复杂度比较高的业务时使用React，而做一些面向用户端的复杂度不是特别高的业务时选用Vue开发。Vue当然也可以做非常大型的项目，具体选用什么框架，还是要看自己的框架掌握程度和业务复杂度。

**安装脚手架工具**

```bash
npx create-react-app my-app
cd my-app
npm start
```

**todolist**

React中要声明一个组件必须先引入react文件，然后继承react的组件类方法。

```javascript
import React from 'react'
class TodoList extends React.Compoment{}
```

也可以使用下面这种写法：

```react
import React, { Component, Fragment } from 'react';
{/*这是React里的注释的写法，外面要包裹一层大括号*/}
class TodoList extends Component{
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
  }
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  handleBtnClick() {
    this.setState({
      list: [this.state.inputValue, ...this.state.list],
      inputValue: ''
    })
  }
  render() {
    return (
      <Fragment>
       <div>
        <input value={this.state.inputValue} onChange={ this.handleInputChange.bind(this) }/>
        <button onClick={this.handleBtnClick.bind(this)}>add</button>
       </div>
       <ul>
        {
          this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
       </ul>
      </Fragment>
    );
  }
}
{/*最后要记得导出组件*/}
export default TodoList;
```

- 组件中要渲染到页面上的部分都写在`render`函数里
- 组件里定义的数据写在`constructor`部分里的`this.state` 对象里面，并一定要写`super(props)`来继承`React`的属性
- 组件里的方法要想改变数据就必须通过`this.setState()`方法来处理