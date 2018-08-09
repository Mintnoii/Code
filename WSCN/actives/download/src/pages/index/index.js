import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './style.css'
import 'swiper/dist/css/swiper.min.css'
import 'swiper-animate/animate.min.css'
import 'regenerator-runtime/runtime'
// import ivanka from '~/services/ivanka'
// import jinshuju from '~/services/jinshuju'
// import config from '~/config'
import Swiper from 'swiper/dist/js/swiper.min'
import {swiperAnimate, swiperAnimateCache} from 'swiper-animate/swiper.animate1.0.2.min'
import gtag from '~/shared/gtag'
import { weixin, isWeixin } from '~/shared/weixin'
import shareMeta from '~/shared/shareMeta'
gtag.init()
let imgSwiper = new Swiper('.imgSwiper', {
  init: false,
  autoplay: true,
  noSwiping: true
})
let textSwiper = new Swiper('.textSwiper', {
  init: false,
  autoplay: true,
  noSwiping: true,
  // loop: true,
  on: {
    init: () => {
      swiperAnimateCache(textSwiper)
      swiperAnimate(textSwiper)
    },
    slideChangeTransitionEnd: () => {
      swiperAnimate(textSwiper)
    }
  }
})
imgSwiper.init()
textSwiper.init()
if (isWeixin) {
  weixin
    .init()
    .then(() => {
      weixin.setShareMeta(shareMeta)
    })
}
