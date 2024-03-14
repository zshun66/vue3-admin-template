/**
 * 进入全屏
 * @param {ELement | String} element 需要进入全屏的元素
 * @returns {}
 */
export function requestFullscreen(element) {
  if (!element) element = document.documentElement
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen()
  }
}

/**
 * 退出全屏
 * @returns {}
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen()
  }
}

/**
 * 检测是否处于全屏模式
 * @returns {boolean}
 */
export function checkFullscreen() {
  return (document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement)
}

/**
 * 添加全屏事件改变监听器
 * @param {function} callback 回调函数
 * @returns {}
 */
export function addFullscreenChange(callback) {
  document.addEventListener('fullscreenchange', callback)
  document.addEventListener('mozfullscreenchange', callback) // Firefox
  document.addEventListener('webkitfullscreenchange', callback) // Chrome, Safari, and Opera
  document.addEventListener('msfullscreenchange', callback) // IE/Edge
}

/**
 * 移除全屏事件改变监听器
 * @param {function} callback 回调函数
 * @returns {}
 */
export function removeFullscreenChange(callback) {
  document.removeEventListener('fullscreenchange', callback)
  document.removeEventListener('mozfullscreenchange', callback) // Firefox
  document.removeEventListener('webkitfullscreenchange', callback) // Chrome, Safari, and Opera
  document.removeEventListener('msfullscreenchange', callback) // IE/Edge
}