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



## `.sync`

## `$attrs` 和 `$listeners`

## `provide` 和 `inject`

