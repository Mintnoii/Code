const { Scene, Sprite, Group, Label, Ring, Path, Rect, Gradient } = spritejs
const container = document.querySelector('#stage')
const scene = new Scene({container, width: 1900, height: 900, mode: 'stickyTop'})

// 1. 配置默认项
const defaultHeatMapConfig = {
  // 渐变色
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

// 2. 将每个数据点映射为一个从中心向外灰度渐变的圆
const createShadowTpl = () => {
  const { min, max, radius } = defaultHeatMapConfig

  // 生成100个随机坐标点数据
  // 数据格式，包括坐标信息与权重值 0~100  { x: 871, y: 277, value: 25 }
  const heatMapData = Object.keys(Array.from({ length: 100 })).map(item => {
    return {
      x: Math.floor(Math.random()*(1500-50+1)+50),
      y: Math.floor(Math.random()*(600-50+1)+50),
      value: Math.floor(Math.random()*(100-10+1)+2),
    }
  })

  // 生成灰度的单点元素
  const singleSprite = heatMapData.map(data => {
    return new Sprite().attr({
      // spriteJs api, render by webGL
      bgcolor: new Gradient({
        // 根据 vector(三维向量)参数个数不同，分别创建LinearGradient和RadialGradient
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
  return singleSprite
}

// 3. 创建渐变色卡
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

// spriteJS 默认使用webGL渲染，contextType指定为Canvas
// handleEvent:false 不派发事件，优化性能
heatmaplayer = scene.layer('heatmaplayer', { contextType: '2d', handleEvent: false})

// 4. 上色
const renderHeatMap = () => {
  heatmaplayer.removeAllChildren()
  // spriteJS默认的layer，append放入元素后会自动渲染
  heatmaplayer.append(...createShadowTpl())
  // ⚠️ 在prepareRender时拿到该层layer的ImageData，对其重新上色
  heatmaplayer.prepareRender.then(() => {
    const colorData = createColordata()
    const paintCtx = heatmaplayer.canvas.getContext('2d')
    const paintData = paintCtx.getImageData(0, 0, 1900, 900)
    // paintData: ImageData对象中存储着canvas对象真实的像素数据
    const { data } = paintData
    // data: Uint8ClampedArray类型的一维数组，包含着RGBA格式的整型数据，范围在0至255之间（包括255）
    
    // 灰度数据可以使用Uint8ClampedArray来运算，不一定非得画出灰色的canvas来获取rgb数据
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

setInterval(() => {
  renderHeatMap()
}, 5000)
