/**
 * 部门项信息
 * parentId			    父级部门ID
 * parentName			  父级部门名称
 * id						    部门ID
 * sort							部门排序
 * name						  部门名称
 * head						  负责人
 * telephone        联系电话
 * email            邮箱
 * status           部门状态
 * children         子部门列表
 * creator          创建者
 * createTime       创建时间
 */
const menuItemObj = {
  parentId: 0,
  parentName: null,
  id: null,
  sort: 1,
  name: '',
  head: '',
  telephone: '',
  email: '',
  status: '1',
  children: [],
  creator: '超级管理员',
  createTime: '2023-11-13 17:08:36'
}

// 深拷贝
const deepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 部门列表
const menuList = [
  // 控制台部门 ---------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: 1,
    sort: 10,
    name: '江西天顺软件有限公司',
    head: '周总',
    telephone: '13755609011',
    email: 'jxtsrjyxgs@163.com',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentName: '江西天顺软件有限公司',
        id: 11,
        sort: 10,
        name: '技术部',
        head: '邹总',
        telephone: '13755609022',
        email: 'jxtsrjyxgsjsb@163.com',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentName: '江西天顺软件有限公司',
        id: 12,
        sort: 20,
        name: '实施部',
        head: '易总',
        telephone: '13755609033',
        email: 'jxtsrjyxgsssb@163.com',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentName: '江西天顺软件有限公司',
        id: 13,
        sort: 30,
        name: '运营部',
        head: '杨总',
        telephone: '13755609044',
        email: 'jxtsrjyxgsyyb@163.com',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentName: '江西天顺软件有限公司',
        id: 14,
        sort: 40,
        name: '商务部',
        head: '许总',
        telephone: '13755609055',
        email: 'jxtsrjyxgsswb@163.com',
      })
    ]
  })
]

export default menuList