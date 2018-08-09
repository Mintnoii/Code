import config from '~/config'
/* eslint-disable import/no-webpack-loader-syntax */
import img from '!!file-loader!~/images/logo.png'

export default {
  title: '华尔街见闻 App 下载',
  desc: '用户更忙、时间更少的时代，我们更精准、更快',
  imgUrl: img,
  link: `${config.BASE_URL}/`
}
