export default function(openUrl = 'wscn://wallstreetcn.com') {
  // 客户端检测微信直接跳应用宝链接
  if (/MicroMessenger/ig.test(navigator.userAgent)) {
    window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wallstreetcn.news'
  }

  // 在iframe 中打开APP
  const ifr = document.createElement('iframe')
  ifr.src = openUrl
  ifr.style.display = 'none'
  document.body.appendChild(ifr)
  const startTime = Date.now()

  setTimeout(() => {
    document.body.removeChild(ifr)
    const endTime = Date.now()
    if (endTime - startTime < 800 + 500) {
      window.location = 'http://activity.wallstreetcn.com/app/mobile.html'
    }
  }, 800)
}
