/**
 * 字典类型项信息
 * id						    字典ID
 * name						  字典名称
 * type						  字典类型
 * remark           字典备注
 * status						字典状态
 * creator          创建者
 * createTime       创建时间
 */

/**
 * 字典数据项信息
 * type						  所属字典类型
 * sort             排序
 * value						数据键值
 * label            数据标签
 * cssStyle         回显样式
 * status						数据状态
 * remark           数据备注
 * creator          创建者
 * createTime       创建时间
 */

export default [
  {
    id: 1,
    name: '用户性别',
    type: 'sys_user_sex',
    remark: '用户性别列表',
    status: '1',
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36',
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
    id: 2,
    name: '系统是否',
    type: 'sys_yes_no',
    remark: '系统是否列表',
    status: '1',
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36',
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
    id: 3,
    name: '菜单状态',
    type: 'sys_menu_status',
    remark: '菜单状态列表',
    status: '0',
    creator: '超级管理员',
    createTime: '2023-11-13 17:08:36',
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