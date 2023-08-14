import { createApp } from 'vue'
import pinia from './store'
import '@/styles/index.scss'
import router from './router'
import '@/router/permission.ts'
import App from './App.vue'
import { loadDirectives } from '@/directive/index.ts'

import LyxPlus from 'lyx-plus'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
//svg插件配置
import 'virtual:svg-icons-register'
//注册全局组件
// import gloablComponent from './components/index';

const app = createApp(App)
//加载自定义指令
loadDirectives(app)
//注册全局icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


// app.use(gloablComponent);
app.use(pinia)
app.use(router)
app.use(LyxPlus)
app.use(ElementPlus, {
  locale: zhCn,
})



app.mount('#app')
