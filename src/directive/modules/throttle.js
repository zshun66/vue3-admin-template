/**
 * v-throttle
 * 节流指令
 */
export default {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      console.error('Provided value must be a function')
      return
    }
    let delay = binding.arg || 1000
    const callback = binding.value
    el.eventNames = Object.keys(binding.modifiers)
    el.debouncedFunction = throttle(callback, delay)
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

function throttle(func, delay) {
  let timeoutId
  let lastExecTime = 0
  return function (...args) {
    const context = this
    const currentTime = Date.now()
    const timeSinceLastExec = currentTime - lastExecTime
    if (!lastExecTime || timeSinceLastExec >= delay) {
      func.apply(context, args)
      lastExecTime = currentTime
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(context, args)
        lastExecTime = Date.now()
        timeoutId = null
      }, delay - timeSinceLastExec)
    }
  }
}