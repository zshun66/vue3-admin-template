/**
 * v-draggable
 * 拖拽指令
 */
export default {
  mounted(el, binding) {
    let {
      sticky = false,
      parent = false,
      screen = false
    } = binding.modifiers
    if (!sticky) {
      parent = false
      screen = false
    }
    if (sticky && !parent && !screen) {
      parent = true
    }
    if (sticky && parent && screen) {
      screen = false
    }
    el.disTop = binding.value
    el.draggable = false
    if (sticky) {
      if (parent) {
        let pOW = el.parentNode.offsetWidth
        let pOH = el.parentNode.offsetHeight
        let pOL = el.parentNode.offsetLeft
        let pOT = el.parentNode.offsetTop
        let eOW = el.offsetWidth
        let eOH = el.offsetHeight
        let dOW = document.body.offsetWidth
        let dOH = document.body.offsetHeight
        el.minLeft = pOL
        el.maxLeft = pOL + pOW - eOW
        if (el.maxLeft > dOW - eOW) {
          el.maxLeft = dOW - eOW
        }
        el.minTop = pOT
        el.maxTop = pOT + pOH - eOH
        if (el.maxTop > dOH - eOH) {
          el.maxTop = dOH - eOH
        }
      }
      if (screen) {
        let dOW = document.body.offsetWidth
        let dOH = document.body.offsetHeight
        let eOW = el.offsetWidth
        let eOH = el.offsetHeight
        el.minLeft = 0
        el.maxLeft = dOW - eOW
        el.minTop = 0
        el.maxTop = dOH - eOH
      }
    }
    el.style.position = 'fixed'
    el.style.zIndex = 99999
    el.addEventListener('mousemove', handleCurrElMouseMove)
    el.addEventListener('mousedown', handleCurrElMouseDown)
  },
  beforeUnmount(el) {
    el.removeEventListener('mousemove', handleCurrElMouseMove)
    el.removeEventListener('mousedown', handleCurrElMouseDown)
  }
}

function handleCurrElMouseMove(e) {
  if (this.disTop) {
    this.draggable = e.offsetY <= this.disTop
    if (this.draggable) this.style.cursor = 'move'
    else this.style.cursor = 'default'
  } else {
    this.draggable = true
    this.style.cursor = 'move'
  }
}

function handleCurrElMouseDown(e) {
  if (!this.draggable) return
  const el = this
  const elCS = window.getComputedStyle(el)
  let eMT = parseFloat(elCS.marginTop)
  let eML = parseFloat(elCS.marginLeft)
  let disX = e.clientX - this.offsetLeft + eML
  let disY = e.clientY - this.offsetTop + eMT
  document.onmousemove = function(e) {
    e.preventDefault()
    let x = e.clientX - disX
    let y = e.clientY - disY
    if (x < el.minLeft - eML) x = el.minLeft - eML
    if (x > el.maxLeft - eML) x = el.maxLeft - eML
    if (y < el.minTop - eMT) y = el.minTop - eMT
    if (y > el.maxTop - eMT) y = el.maxTop - eMT
    el.style.left = x + 'px'
    el.style.top = y + 'px'
  }
  document.onmouseup = function(e) {
    e.preventDefault()
    document.onmousemove = document.onmouseup = null
  }
}