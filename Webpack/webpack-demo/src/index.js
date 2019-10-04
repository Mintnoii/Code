import './styles/index.scss';
import webpackImg from './assets/images/webpack.jpg';
import counter from './counter';
// var webpackImg = require('./assets/images/webpack.jpg')

console.log(webpackImg)
counter();
let img = new Image();
img.src = webpackImg;

let testStr = 'Hello World, this is a webpack-demo.😬';
let root = document.getElementById('root');
root.innerText = testStr;
root.append(img);
console.log(testStr);

// 调用 lodash 的方法
// console.log(_.join(['a','b'],'🤪'))

function getComponent() {
  // Lodash, now imported by this script
  /* webpackChunkName: "lodash" */ 
	return import('lodash').then(({ default: _ }) => {
		var element = document.createElement('div');
		element.innerHTML = _.join(['Hello', 'webpack'], '🎉');
		return element;
	}).catch(
    error => 'An error occurred while loading the component');
}

getComponent().then(component => {
	document.body.appendChild(component);
})
