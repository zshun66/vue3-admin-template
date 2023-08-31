import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import pinia from './pinia/index.js'
import i18n from './lang/index.js'
// IconPark图标库
import { install as installIconPark } from '@icon-park/vue-next/es/all'
import '@icon-park/vue-next/styles/index.css'
// SVG图标
import 'virtual:svg-icons-register'
// 全局样式
import '@/styles/index.scss'
// 全局自定义组件
import gloablComponents from './components/index.js'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.use(gloablComponents)
installIconPark(app)
app.mount('#app')

console.log(import.meta.env)