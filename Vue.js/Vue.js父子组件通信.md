# Vue.js父子组件通信

## `props`

这是最常用的通信方式，我们可以通过Prop向子组件传递数据。

父子组件之间的数据传递相当于自下而上的下水管，只能从上向下流，不能逆流。

这也是Vue的设计理念之单向数据流。

Prop正是管道与管道之间的一个衔接口，这样水(数据)才能往下流。

```vue
<div id="app">
    <child :content="message"></child>
</div>

// js
let Child = Vue.extend({
	template: '<h2>{{messge}}</h2>',
	props: {
		content: {
			type: String,
			default: () => { return 'from child'}
		}
	}
})

new Vue({
	el: #app.
	data: {
		message: 'from parent'
	},
	components: {
		Child
	}
})

// 浏览器输出: from parent
```

## `$emit`

触发当前实例上的事件。附加参数都会传给监听器回调。

```vue
<div id="app">
    <my-button @greet="sayHi"></my-button>
</div>

let MyButton = Vue.extend({
	template: '<button @click="triggerClick">click</button>',
	data () {
		return {
			greeting: 'Vue.js!'
		}
	},
	methods: {
		triggerClick () {
			this.$emit('greet', this.greeting)
		}
	}
})

new Vue({
	el: '#app',
	components: {
		MyButton
	},
	methods: {
		sayHi (val) {
			alert('Hi,' + val) // 'Hi, vue.js'
		}
	}
})
```

1. 点击页面上的按钮，会触发MyButton组件上的监听事件triggerClick
2. triggerClick方法会通知greet回调函数，同时把参数this.greeting传递过去
3. vue实例中greet回调执行时，会触发sayHi方法，同时得到组件传递过来的this.greeting参数

## `.sync`

## `$attrs` 和 `$listeners`

## `provide` 和 `inject`

