import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './router/permission.js'
import pinia from './pinia/index.js'
import i18n from './lang/index.js'
// SVG图标
import 'virtual:svg-icons-register'
// Element Plus 暗黑模式 样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 全局样式
import '@/styles/index.scss'
// 全局自定义组件
import gloablComponents from './components/index.js'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.use(gloablComponents)
app.mount('#app')

console.log(import.meta.env)