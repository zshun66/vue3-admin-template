/**
 * v-throttle
 * 节流指令
 */
import { throttle } from '@/utils/index.js'

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