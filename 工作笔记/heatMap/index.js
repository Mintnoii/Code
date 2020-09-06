const { Scene, Sprite, Group, Label, Ring, Path, Rect, Gradient } = spritejs
const container = document.querySelector('#stage')
const scene = new Scene({container, width: 1900, height: 900, mode: 'stickyTop'})

const defaultHeatMapConfig = {
  gradient: {
    0.25: "blue",
    0.45: "lime",
    0.75: "yellow",
    1: "red"
  },
  min: 0,
  max: 100,
  radius: 100,
}
// 为每个数据点设置一个从中心向外灰度渐变的圆
const createShadowTpl = () => {
  const { min, max, radius } = defaultHeatMapConfig
  // 数据格式，包括坐标信息与权重值
  // const heatMapData = [
  //   { x: 871, y: 277, value: 25 },
  //   { x: 638, y: 375, value: 97 },
  //   { x: 773, y: 190, value: 71 },
  // ]
  const heatMapData = Object.keys(Array.from({ length: 100 })).map(item => {
    return {
      x: Math.floor(Math.random()*(1500-50+1)+50),
      y: Math.floor(Math.random()*(600-50+1)+50),
      value: Math.floor(Math.random()*(98-35+1)+2),
    }
  })
  const testSprite = heatMapData.map(data => {
    return new Sprite().attr({
      // spriteJs api
      bgcolor: new Gradient({
        vector: [radius, radius, 0, radius, radius, radius],
        colors: [
          { offset: 0, color: 'rgba(0,0,0,1)'},
          { offset: 1, color: 'rgba(0,0,0,0)'}
        ],
      }),
      opacity: (data.value - min) / (max - min),
      pos: [data.x, data.y],
      size: [radius * 2, radius * 2],
    })
  })
  return testSprite
}

// 创建渐变色卡
const createColordata = () => {
  const colourBar = document.createElement('canvas')
  const cCtx = colourBar.getContext('2d')
  const rect = [0,0,256,1]
  const grd = cCtx.createLinearGradient(...rect)
  const { gradient } = defaultHeatMapConfig
  for (let key in gradient) {
    grd.addColorStop(parseFloat(key), gradient[key])
  }
  cCtx.fillStyle = grd
  cCtx.fillRect(...rect)
  return cCtx.getImageData(...rect).data
}
// 上色
// spriteJS 默认使用webGL渲染，contextType指定为Canvas
// handleEvent:false 不派发事件，优化性能
heatmaplayer = scene.layer('heatmaplayer', { contextType: '2d', handleEvent: false})

const renderHeatMap = () => {
  // spriteJS默认的layer，append放入元素后会自动渲染
  heatmaplayer.removeAllChildren()
  heatmaplayer.append(...createShadowTpl())
  // 在prepareRender时拿到该层layer的ImageData，对其重新上色
  heatmaplayer.prepareRender.then(() => {
    const colorData = createColordata()
    const paintCtx = heatmaplayer.canvas.getContext('2d')
    const paintData = paintCtx.getImageData(0, 0, 1900, 900)
    const { data } = paintData
    for (let i = 0; i < data.length; i++) {
      const value = data[i]
      if (value) {
        data[i - 3] = colorData[4 * value]
        data[i - 2] = colorData[4 * value + 1]
        data[i - 1] = colorData[4 * value + 2]
      }
    }
    paintCtx.putImageData(paintData, 0, 0)
  })
}

// setInterval(() => {
//   renderHeatMap()
// }, 1500)

// const robotLayer = scene.layer()
// const robot = new Sprite('https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png')
// robot.attr({
//   anchor: [0, 0.5],
//   pos: [0, 0],
//   size: [100, 160]
// });
// robot.animate([
//   {pos: [0, 0]},
//   {pos: [0, 300]},
//   {pos: [1800, 500]},
//   {pos: [1800, 0]},
// ], {
//   duration: 5000,
//   iterations: Infinity,
//   direction: 'alternate',
// })
// robotLayer.append(robot)