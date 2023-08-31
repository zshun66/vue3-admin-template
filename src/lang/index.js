import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.js'
import zhTW from './locales/zh-TW.js'
import enUS from './locales/en-US.js'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
  }
})

export default i18n