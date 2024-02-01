// 角色列表
const roleListAll = [
  {
    id: '1',
    sort: 10,
    name: '超级管理员',
    perms: 'administrator',
    status: '1',
    menuIds: [
      "99",
      "1",
      "11",
      "12",
      "13",
      "2",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "301",
      "302",
      "303"
    ],
    remark: '拥有所有权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '2',
    sort: 20,
    name: '开发者',
    perms: 'developer',
    status: '1',
    menuIds: [
      "99",
      "1",
      "11",
      "12",
      "13"
    ],
    remark: '拥有部分权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]

export default roleListAll