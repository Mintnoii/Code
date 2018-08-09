import WscnWeixin from 'wscn-weixin'
import api from '~/services/ivanka'

const { wx, isWeixin } = WscnWeixin
const weixin = new WscnWeixin(api)

export { weixin, wx, isWeixin }
