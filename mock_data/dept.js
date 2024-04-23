// 部门列表
const deptListAll = [
  {
    parentId: 0,
    parentName: null,
    id: '1',
    sort: 10,
    name: '江西天顺软件有限公司',
    head: '周总',
    telephone: '13755609011',
    email: 'jxtsrjyxgs@163.com',
    status: '1',
    children: [
      {
        parentId: '1',
        parentName: '江西天顺软件有限公司',
        id: '11',
        sort: 10,
        name: '技术部',
        head: '邹总',
        telephone: '13755609022',
        email: 'jxtsrjyxgsjsb@163.com',
        status: '1',
        children: [],
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36'
      },
      {
        parentId: '1',
        parentName: '江西天顺软件有限公司',
        id: '12',
        sort: 20,
        name: '实施部',
        head: '易总',
        telephone: '13755609033',
        email: 'jxtsrjyxgsssb@163.com',
        status: '1',
        children: [],
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36'
      },
      {
        parentId: '1',
        parentName: '江西天顺软件有限公司',
        id: '13',
        sort: 30,
        name: '运营部',
        head: '杨总',
        telephone: '13755609044',
        email: 'jxtsrjyxgsyyb@163.com',
        status: '1',
        children: [],
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36'
      },
      {
        parentId: '1',
        parentName: '江西天顺软件有限公司',
        id: '14',
        sort: 40,
        name: '商务部',
        head: '许总',
        telephone: '13755609055',
        email: 'jxtsrjyxgsswb@163.com',
        status: '1',
        children: [],
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36'
      }
    ],
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36'
  }
]

export default deptListAll
