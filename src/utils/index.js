/**
 * 防抖函数
 * @param {function} func 要执行的函数
 * @param {number} delay 延迟执行的时间（以毫秒为单位）
 * @param {boolean} immediate 可选参数，是否立即执行函数。如果为 true，则函数会在延迟开始前执行，而不是延迟结束后执行。
 * @returns {function}
 */
export function debounce(func, delay, immediate) {
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

/**
 * 节流函数
 * @param {function} func 要执行的函数
 * @param {number} delay 节流的时间间隔（以毫秒为单位）
 * @returns {function}
 */
export function throttle(func, delay) {
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