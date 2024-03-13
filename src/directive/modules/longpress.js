/**
 * v-longpress
 * 长按指令
 */
export default {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      console.error('callback must be a function')
      return
    }
    el.time = binding.arg || 1000
    el.callback = binding.value
    el.timer = null
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    el.addEventListener('mouseup', cancel)
    el.addEventListener('mouseleave', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
}

function start(e) {
  if (
    (e.type === 'mousedown' && e.button === 0) ||
    (e.type === 'touchstart')
  ) {
    if (this.timer === null) {
      this.timer = setTimeout(() => this.callback(e), this.time)
    }
  }
}

function cancel(e) {
  if (this.timer !== null) {
    clearTimeout(this.timer)
    this.timer = null
  }
}