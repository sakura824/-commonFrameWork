import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import baseRoutes from "./modules/base";

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: RouteRecordRaw[] = []

Object.values(modules).forEach((key: any) => {
  const mod = key.default || []
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})


const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeModuleList, ...baseRoutes]
})

export default router
//导出需要权限控制展示的路由
export const asyncRoutes: RouteRecordRaw[] = routeModuleList 
