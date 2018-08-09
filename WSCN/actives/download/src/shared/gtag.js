const gtag = function () {
  window.dataLayer.push(arguments)
}

gtag.init = function (trackingId = 'UA-19303398-2') {
  window.dataLayer = window.dataLayer || []
  gtag('js', new Date())
  gtag('config', trackingId)
}

export default gtag
