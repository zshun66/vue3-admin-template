# Vue 3 + Vite + Element Plus

```
请求头可额外配置的参数说明：

isAuth: 该请求是否需要携带token
isRepeatSubmit: 该请求是否需要防止重复提交(只针对post、put请求)
isAlertMsg: 请求发生异常后是否弹出错误消息
```

```
提交时必须附带的信息前缀：

'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'update',//代码更新、功能更新等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动

当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m 'fix: xxx' 符合类型的才可以，需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的
```

```
系统管理各个菜单信息：
  菜单管理：
    /**
    * 菜单项信息
    * parentId			    父级菜单ID
    * parentTitle			  父级菜单标题
    * id						    菜单ID
    * sort							菜单排序
    * type							菜单类型(directory目录、menu菜单、button按钮)
    * title						  菜单标题
    * icon							菜单图标
    * iconSize					菜单图标大小
    * isLink						是否外链(1是 0否)
    * path							路由路径
    * name              路由名称
    * component				  组件路径
    * perms						  权限字符
    * isCache					  是否缓存(1是 0否)
    * isVisible				  是否菜单栏可见(1是 0否)
    * isClearable       是否可关闭(1是 0否)
    * status						菜单状态(1正常 0禁用)
    * children          子菜单列表
    * creator           创建者
    * createTime        创建时间
    */

  角色管理：
    /**
    * 角色项信息
    * id						    角色ID
    * sort					    角色排序
    * name						  角色名称
    * perms						  权限字符
    * status						角色状态(1正常 0禁用)
    * menuIds           角色拥有的菜单id集合
    * remark            备注
    * creator           创建者
    * createTime        创建时间
    */

  部门管理：
    /**
    * 部门项信息
    * parentId			    父级部门ID
    * parentName			  父级部门名称
    * id						    部门ID
    * sort							部门排序
    * name						  部门名称
    * head						  负责人
    * telephone         联系电话
    * email             邮箱
    * status            部门状态
    * children          子部门列表
    * creator           创建者
    * createTime        创建时间
    */

  岗位管理：
    /**
    * 岗位项信息
    * id						    岗位ID
    * name						  岗位名称
    * code						  岗位编码
    * sort					    岗位排序
    * status						岗位状态
    * remark            岗位备注
    * creator           创建者
    * createTime        创建时间
    */
  
  用户管理：
    /**
    * 用户项信息
    * id					      用户ID
    * sort              用户排序
    * avatar			      用户头像
    * nickname					用户昵称
    * username					用户名称
    * password					用户密码
    * phone             用户手机号码
    * email             用户邮箱
    * sex               用户性别
    * roles						  用户所属角色列表
    * dept              用户所属部门
    * post              用户所属岗位
    * status            用户状态
    * remark            备注
    * token						  token凭证
    * creator           创建者
    * createTime        创建时间
    */

  字典管理：
    /**
    * 字典类型项信息
    * id						    字典ID
    * name						  字典名称
    * type						  字典类型
    * remark            字典备注
    * status						字典状态
    * creator           创建者
    * createTime        创建时间
    */

    /**
    * 字典数据项信息
    * type						  所属字典类型
    * sort              排序
    * value						  数据键值
    * label             数据标签
    * cssStyle          回显样式
    * status						数据状态
    * remark            数据备注
    * creator           创建者
    * createTime        创建时间
    */

  参数管理：
    /**
    * 参数项信息
    * id						    参数ID
    * name						  参数名称
    * key						    参数键名
    * value					    参数键值
    * type              系统内置
    * status						参数状态
    * remark            参数备注
    * creator           创建者
    * createTime        创建时间
    */
  
  操作日志：
    /**
    * 操作日志项信息
    * id						    操作日志ID
    * title						  系统模块
    * operType					操作类型
    * operName					操作人
    * operIp            操作IP地址
    * operLoc           操作地点
    * costTime          消耗时间
    * status						操作状态
    * operTime          操作时间
    * operUrl           请求地址
    * reqMethod         请求方法
    * operMethod        操作方法
    * operParam         请求参数
    * jsonResult        返回参数
    * errorMsg          错误消息
    */

  登录日志：
    /**
    * 登录日志项信息
    * id						    登录日志ID
    * userName					用户名称
    * ipAddr					  登录地址
    * loginLoc          登录地点
    * browser           浏览器
    * os                操作系统
    * status            登录状态
    * msg               操作信息
    * loginTime         登录时间
    */

  错误日志：
    /**
    * 错误日志项信息
    */
```