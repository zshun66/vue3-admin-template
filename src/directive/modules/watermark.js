/**
 * v-watermark
 * 水印指令
 */
export default {
  mounted(el, binding) {
    const {
      text = '水印',
      family = 'Microsoft JhengHei',
      size = 16,
      color = 'rgba(180, 180, 180, 0.3)',
      angle = -30,
      row = 8,
      column = 5,
    } = binding.value
    const canvas = document.createElement('canvas')
    el.appendChild(canvas)
    canvas.style.display = 'none'
    canvas.width = Math.max(el.offsetWidth / row, 150)
    canvas.height = Math.max(el.offsetHeight / column, 100)
    const ctx = canvas.getContext('2d')
    const textWidth = ctx.measureText(text).width
    const textHeight = size
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((angle * Math.PI) / 180)
    ctx.font = `${size}px ${family}`
    ctx.fillStyle = color
    ctx.fillText(text, -(textWidth / 1), textHeight / 2)
    el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')'
    el.style.backgroundRepeat = 'repeat'
    el.removeChild(canvas)
  }
}