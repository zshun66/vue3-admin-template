/**
 * 权限Hook
 */
import useUserStore from '@/pinia/modules/user.js'
import { extractKeyNamesFromTree } from '@/utils/treehandler.js'

const userStore = useUserStore()
const permss = userStore.userInfo.menus
const roles = userStore.userInfo.roles
const permsAuths = extractKeyNamesFromTree(permss, 'perms')
const roleAuths = extractKeyNamesFromTree(roles, 'perms')

const useAuth = () => {
  return {
    // 验证用户是否具备某个权限
    hasPerms(perms) {
      return permsAuths.includes(perms)
    },
    // 验证用户是否具备某些权限,只需拥有其中一个
    hasPermsOr(perms) {
      return perms.some(item => permsAuths.includes(item))
    },
    // 验证用户是否具备某些权限,必须全部拥有
    hasPermsAnd(perms) {
      return perms.every(item => permsAuths.includes(item))
    },
    // 验证用户是否具备某个角色
    hasRole(role) {
      return roleAuths.includes(role)
    },
    // 验证用户是否具备某些角色,只需拥有其中一个
    hasRoleOr(roles) {
      return roles.some(item => roleAuths.includes(item))
    },
    // 验证用户是否具备某些角色,必须全部拥有
    hasRoleAnd(roles) {
      return roles.every(item => roleAuths.includes(item))
    },
  }
}

export default useAuth