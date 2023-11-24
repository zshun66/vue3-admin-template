/**
 * 操作日志项信息
 * id						    操作日志ID
 * title						系统模块
 * operType					操作类型
 * operName					操作人
 * operIp           操作IP地址
 * operLoc          操作地点
 * costTime         消耗时间
 * status						操作状态
 * operTime         操作时间
 * operUrl          请求地址
 * reqMethod        请求方法
 * operMethod       操作方法
 * operParam        请求参数
 * jsonResult       返回参数
 * errorMsg         错误消息
 */

export default [
  {
    id: 5499,
    title: '代码生成',
    operType: '8',
    operName: 'admin',
    operIp: '116.128.245.109',
    operLoc: '湖南省 长沙市',
    costTime: 16,
    status: '1',
    operTime: '2023-11-24 10:00:59',
    operUrl: '/tool/gen/batchGenCode',
    reqMethod: 'GET',
    operMethod: 'com.ruoyi.project.tool.gen.controller.GenController.batchGenCode()',
    operParam: '{"tables":"sys_post"}',
    jsonResult: '',
    errorMsg: ''
  },
  {
    id: 5498,
    title: '代码生成',
    operType: '8',
    operName: 'admin',
    operIp: '59.49.17.59',
    operLoc: '山西省 太原市',
    costTime: 15,
    status: '1',
    operTime: '2023-11-24 09:56:03',
    operUrl: '/tool/gen/batchGenCode',
    reqMethod: 'GET',
    operMethod: 'com.zs.project.tool.gen.controller.GenController.batchGenCode()',
    operParam: '{"tables":"sys_post"}',
    jsonResult: '',
    errorMsg: ''
  },
  {
    id: 5497,
    title: '代码生成',
    operType: '8',
    operName: 'admin',
    operIp: '222.128.15.208',
    operLoc: '北京市 北京市',
    costTime: 16,
    status: '0',
    operTime: '2023-11-24 09:55:36',
    operUrl: '/tool/gen/batchGenCode',
    reqMethod: 'GET',
    operMethod: 'com.zs.project.tool.gen.controller.GenController.batchGenCode()',
    operParam: '{"tables":"sys_post"}',
    jsonResult: '',
    errorMsg: ''
  },
]