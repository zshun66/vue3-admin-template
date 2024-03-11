import perms from './modules/perms.js'
import role from './modules/role.js'
import copy from './modules/copy.js'

const directives = {
  perms,
  role,
  copy
}

export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}