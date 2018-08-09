import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './newmobile.css'
import 'swiper/dist/css/swiper.min.css'
import phone1 from './images/phone1.png'
import phone2 from './images/phone2.png'
import phone3 from './images/phone3.png'
import phone4 from './images/phone4.png'
import phone5 from './images/phone5.png'
import phone6 from './images/phone6.png'
import bg1 from './images/bg1.png'
import bg2 from './images/bg2.png'
import bg3 from './images/bg3.png'
import bg4 from './images/bg4.png'
import bg5 from './images/bg5.png'
import bg6 from './images/bg6.png'
import bg7 from './images/bg7.png'
import 'regenerator-runtime/runtime'
// import ivanka from '~/services/ivanka'
// import jinshuju from '~/services/jinshuju'
// import config from '~/config'
import Swiper from 'swiper/dist/js/swiper.min'
import gtag from '~/shared/gtag'
import {
  weixin,
  isWeixin
} from '~/shared/weixin'
import shareMeta from '~/shared/shareMeta'

var $parentEl = document.querySelector('.mobile-swiper-container')
$parentEl.style.visibility = 'hidden'
// ua && href
var href
var ua = navigator.userAgent.toLowerCase()

if (/micromessenger/.test(ua)) {
  href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wallstreetcn.news'
} else if (/iphone|ipad|ipod/.test(ua)) {
  href = 'https://itunes.apple.com/cn/app/id738227477?mt=8'
} else {
  href = 'http://dl.wallstreetcn.com/wallstreetcn_wscn.apk'
}

// attribute href
var $downloadEl = document.querySelectorAll('.section-header-download-link')
var $downloadBtn = document.querySelectorAll('.download-img-btn');
[].slice.call($downloadEl).forEach(function (item) {
  item.setAttribute('href', href)
});
[].slice.call($downloadBtn).forEach(function (item) {
  item.setAttribute('href', href)
})
// preload image
var imgArr = [phone1, phone2, phone3, phone4, phone5, phone6, bg1, bg2, bg3, bg4, bg5, bg6, bg7]

var count = 0
load(handleEvents)

function load(cb) {
  var imgObj = new Image()
  imgObj.src = imgArr[count]

  imgObj.addEventListener('load', function () {
    if (count >= imgArr.length) {
      cb()
    } else {
      load(cb)
    }
    count++
  }, false)
}

function handleEvents() {
  $parentEl.style.visibility = 'visible'
  /* eslint-disable no-new */
  new Swiper('.mobile-swiper-container', {
    direction: 'vertical',
    autoplay: 3000
  })
  if (/iphone|ipad|ipod/.test(ua) && ua.indexOf('weibo') !== -1) {
    [].slice.call($downloadEl).forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        alert('请在浏览器中打开')
      }, false)
    });
    [].slice.call($downloadBtn).forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault()
        alert('请在浏览器中打开')
      }, false)
    })
  }
}
gtag.init()

if (isWeixin) {
  weixin
    .init()
    .then(() => {
      weixin.setShareMeta(shareMeta)
    })
}
