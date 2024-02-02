// 字典类型列表(全部)
const dictTypeListAll = [
  {
    id: '1',
    name: '用户性别',
    type: 'sys_user_sex',
    remark: '用户性别列表',
    status: '1',
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36'
  },
  {
    id: '2',
    name: '系统是否',
    type: 'sys_yes_no',
    remark: '系统是否列表',
    status: '1',
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36'
  },
  {
    id: '3',
    name: '菜单状态',
    type: 'sys_menu_status',
    remark: '菜单状态列表',
    status: '0',
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36'
  },
]

// 字典数据列表Map
const dictDataListAll = [
  {
    type: 'sys_user_sex',
    typeId: '1',
    typeName: '用户性别',
    options: [
      {
        type: 'sys_user_sex',
        sort: 10,
        value: '1',
        label: '男',
        cssStyle: '',
        status: '1',
        remark: '性别男',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      },
      {
        type: 'sys_user_sex',
        sort: 20,
        value: '0',
        label: '女',
        cssStyle: '',
        status: '1',
        remark: '性别女',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      },
      {
        type: 'sys_user_sex',
        sort: 30,
        value: '9',
        label: '未知',
        cssStyle: '',
        status: '0',
        remark: '性别未知',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      }
    ]
  },
  {
    type: 'sys_yes_no',
    typeId: '2',
    typeName: '系统是否',
    options: [
      {
        type: 'sys_yes_no',
        sort: 10,
        value: '1',
        label: '是',
        cssStyle: '',
        status: '1',
        remark: '是',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      },
      {
        type: 'sys_yes_no',
        sort: 20,
        value: '0',
        label: '否',
        cssStyle: '',
        status: '1',
        remark: '否',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      }
    ]
  },
  {
    type: 'sys_menu_status',
    typeId: '3',
    typeName: '菜单状态',
    options: [
      {
        type: 'sys_menu_status',
        sort: 10,
        value: '1',
        label: '正常',
        cssStyle: '',
        status: '1',
        remark: '正常',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      },
      {
        type: 'sys_menu_status',
        sort: 20,
        value: '0',
        label: '禁用',
        cssStyle: '',
        status: '1',
        remark: '禁用',
        creator: '超级管理员',
        createTime: '2023-11-13 17:08:36',
      }
    ]
  },
]

export {
  dictTypeListAll,
  dictDataListAll
}