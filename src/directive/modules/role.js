/**
 * v-role
 * 角色权限指令
 */
import useUserStore from '@/pinia/modules/user.js'
import { extractKeyNamesFromTree } from '@/utils/tree.js'

export default {
  mounted(el, binding) {
    const userStore = useUserStore()
    const roles = userStore.userInfo.roles
    const auths = extractKeyNamesFromTree(roles, 'perms')
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