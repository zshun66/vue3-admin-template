import perms from './modules/perms.js'
import role from './modules/role.js'
import copy from './modules/copy.js'
import watermark from './modules/watermark.js'
import draggable from './modules/draggable.js'
import longpress from './modules/longpress.js'
import debounce from './modules/debounce.js'
import throttle from './modules/throttle.js'

const directives = {
  perms,
  role,
  copy,
  watermark,
  draggable,
  longpress,
  debounce,
  throttle,
}

export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}