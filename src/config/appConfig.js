// 应用配置
export default {
  /**
   * 菜单折叠状态(true折叠、false不折叠)
   */
  collapse: {
    storage: true,
    value: false
  },
  /**
   * 主题(light亮色、dark暗色)
   */
  theme: {
    storage: true,
    value: 'light'
  },
  /**
   * 语言(zh-CN简体中文、zh-TW繁体中文、en-US英文)
   */
  lang: {
    storage: true,
    value: 'zh-CN'
  },
  /**
   * 组件大小(large、default、small)
   */
  size: {
    storage: true,
    value: 'default'
  },
  /**
   * 页面切换时过渡(true过渡、false不过渡)
   */
  pageTranstion: {
    storage: true,
    value: true
  }
}