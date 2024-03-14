/**
 * v-debounce
 * 防抖指令
 */
export default {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      console.error('Provided value must be a function')
      return
    }
    let delay = binding.arg || 1000
    let immediate = binding.modifiers.immediate || false
    const callback = binding.value
    el.eventNames = Object.keys(binding.modifiers)
    el.debouncedFunction = debounce(callback, delay, immediate)
    for (let eventName of el.eventNames) {
      el.addEventListener(eventName, el.debouncedFunction)
    }
  },
  beforeUnmount(el) {
    for (let eventName of el.eventNames) {
      el.removeEventListener(eventName, el.debouncedFunction)
    }
  }
}

function debounce(func, delay, immediate) {
  let timeout = null
  return function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
    if (callNow) {
      func.apply(context, args)
    }
  }
}