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
所遇问题：
1、<KeepAlive>组件中不能嵌套<div>包裹<component>组件，否则会导致<KeepAlive>组件失效
2、<RouterView>组件中最好不要使用两个<Transition>组件，会导致页面切换的时候动画效果异常

系统缺陷：
1、菜单数据中的'name'字段值必须与对应文件<setup name="">语法糖中的name属性保持一致
```