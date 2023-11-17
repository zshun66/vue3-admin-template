import roleData from './role.js'
import deptData from './dept.js'
import postData from './post.js'

/**
 * 用户项信息
 * id					      用户ID
 * sort             用户排序
 * avatar			      用户头像
 * nickname					用户昵称
 * username					用户名称
 * password					用户密码
 * phone            用户手机号码
 * email            用户邮箱
 * sex              用户性别
 * roles						用户所属角色列表
 * routes						用户拥有菜单列表
 * dept             用户所属部门
 * post             用户所属岗位
 * status           用户状态
 * remark           备注
 * token						token凭证
 * creator          创建者
 * createTime       创建时间
 */

const adminRole = roleData.find(item => item.id === 1)
const developerRole = roleData.find(item => item.id === 2)

const adminDept = deptData.find(item => item.id === 1)
const developerDept = adminDept.children.find(item => item.id === 11)
delete adminDept['children']
delete developerDept['children']

const adminPost = postData.find(item => item.id === 1)
const developerPost = postData.find(item => item.id === 5)

export default [
  {
    id: 1,
    sort: 10,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '周大帅-超级管理员',
    username: 'admin',
    password: '111111',
    phone: '13755609011',
    email: '2436509528@qq.com',
    sex: '1',
    roles: [adminRole],
    routes: adminRole.menus,
    dept: adminDept,
    post: adminPost,
    status: '1',
    remark: '我是周大帅',
    token: 'Admin Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: 2,
    sort: 20,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '法外狂徒-开发者',
    username: 'developer',
    password: '111111',
    phone: '13755609022',
    email: '2436509529@qq.com',
    sex: '0',
    roles: [developerRole],
    routes: developerRole.menus,
    dept: developerDept,
    post: developerPost,
    status: '1',
    remark: '我是法外狂徒',
    token: 'Developer Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]