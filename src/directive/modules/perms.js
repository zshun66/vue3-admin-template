/**
 * v-perms
 * 按钮权限指令
 */
import useUserStore from '@/pinia/modules/user.js'
import { extractKeyNamesFromTree } from '@/utils/treehandler.js'

export default {
  mounted(el, binding) {
    const userStore = useUserStore()
    const menus = userStore.userInfo.menus
    const auths = extractKeyNamesFromTree(menus, 'perms')
    const { value } = binding
    if (value instanceof Array) {
      if (value.length > 0) {
        const hasAuth = value.every(item => auths.includes(item))
        if (!hasAuth) el.remove()
      }
    } else if (typeof value === 'string') {
      if (!auths.includes(value)) el.remove()
    }
  }
}