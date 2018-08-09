import WscnIvankaAPI from 'wscn-ivanka-api'

const api = new WscnIvankaAPI({
  ivankaPlatform: 'wscn-platform',
  clientType: 'mweb',
  deviceIdPrefix: 'mwscn'
})

export default api
