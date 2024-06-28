import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './router/permission.js'
import pinia from './pinia/index.js'
import directive from './directive/index.js'
import i18n from './lang/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import VForm3 from 'vform3-builds'
import 'vform3-builds/dist/designer.style.css'

// 注册SVG图标
import 'virtual:svg-icons-register'
// 全局样式
import '@/styles/index.scss'
// 全局自定义组件
import gloablComponents from './components/index.js'

// 生产环境应用Mock
import { setupProdMockServer } from '../mockProdServer/index.js'
if (import.meta.env.VITE_APP_MOCK_ENABLE_MODE === 'prod') {
  setupProdMockServer()
}

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(directive)
app.use(i18n)
app.use(ElementPlus)
app.use(VForm3)
app.use(gloablComponents)
app.mount('#app')

console.log(import.meta.env)