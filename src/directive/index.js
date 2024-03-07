import perms from './modules/perms.js'
import role from './modules/role.js'

const directives = {
  perms,
  role
}

export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}