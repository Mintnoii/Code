import './styles/index.scss';
import webpackImg from './assets/images/webpack.jpg';
// var webpackImg = require('./assets/images/webpack.jpg')
console.log(webpackImg)

let img = new Image();
img.src = webpackImg;

let testStr = 'Hello World, this is a webpack-demo.';
let root = document.getElementById('root');
root.innerText = testStr;
root.append(img);
console.log(testStr);
