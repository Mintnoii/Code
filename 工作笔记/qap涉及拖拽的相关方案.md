# qap涉及拖拽的相关方案

最近在开发的东西，涉及到页面的拖拽，但是原生的方法基本都不好使，qap的组件文档看到有手势相关的，但是过于简单了，但是既然有手势自然会有实现方法，像RN的话使用的PanResponder也许有相关的，去rax文档查了一下还真有。链接 [rax-](https://alibaba.github.io/rax/guide/panresponder)[PanResponder](https://alibaba.github.io/rax/guide/panresponder)

随便写了个简单的demo供参考：

```react
// 引入
import PanResponder from 'universal-panresponder';
// ...

constructor(props) {
  // ...
  this.state = {
    // ...
    testTop: 0,
    testLeft: 0
  };
  // ...
  this.testTop = 0;
  this.testLeft = 0;
  // 关键方法
  this.panResponder = PanResponder.create({
    // 处理触摸激活responser,返回值为true代表当前View可以响应触摸手势被激活
    onStartShouldSetPanResponder: () => true,
    // 处理滑动激活responser,返回值为true代表当前View可以响应滑动手势被激活
    onMoveShouldSetPanResponder: () => true,
    // 组件被激活时调用的方法
    onPanResponderGrant: () => {
      this.testTop = this.state.testTop;
      this.testLeft = this.state.testLeft;
    },
    // 滑动时候调用的方法
    // evt: 获取触摸的位置再被响应的View中的相对坐标
    // gesture: 对象，包含几个重要参数：
    //    dx/dy: 相对位移
    //    vx/vy: 两个方向的速度
    //    ... 其他的自己看文档哈
    onPanResponderMove: (evt, gesture) => {
      this.setState({
        testTop: this.testTop + gesture.dy,
        testLeft: this.testLeft + gesture.dx
      });
    },
    // 离开屏幕调用的方法
    onPanResponderRelease: (evt, gesture) => {
      this.setState({
        testTop: this.testTop + gesture.dy,
        testLeft: this.testLeft + gesture.dx
      });
    }
  });
}

render = () => {
  const { testTop, testLeft } = this.state;
  // ... 随便找个位置加上试试吧
  return (
      <TouchableHighlight 
        style={{ width: '300rem', height: '300rem', position: 'fixed', top: testTop, left: testLeft }}
        { ...this.panResponder.panHandlers }
        >
        <Image source={{uri: '//q.aiyongbao.com/trade/web/images/qap_img/mobile/wwang3.png'}} style={{ width: '300rem', height: '300rem' }}/>
      </TouchableHighlight>
  );

}
```

