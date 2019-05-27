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

export default TodoList;
```



