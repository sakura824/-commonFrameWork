import { createPinia, defineStore } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()
// 使用pinia持久化插件
pinia.use(persist)

const modules = import.meta.glob('./modules/*.ts', {eager: true})
// type StoreModules = Record<string, ReturnType<typeof defineStore>> //这样写在页面中取store的时候会报错
interface StoreModules {
  [name: string]: Function
}

const loadStoreModules = async () => {
    const stores: StoreModules = {}
    await Promise.all(
      Object.entries(modules).map( async ([key, moduleMethod]: any) => {
        const module = await moduleMethod
        if('default' in module) {
          const keyName = /(.*\/)*(.*)\.ts/.exec(key)[2]
          stores[keyName] = module.default
          // stores[key] = module.default
        } else {
          for (const moduleName in module) {
            if (Object.prototype.hasOwnProperty.call(module, moduleName)) {
              stores[moduleName] = module[moduleName];
            }
          }
        }
      })
    )
    return stores
  }
  
  const store = await loadStoreModules()

  export { store }
  export default pinia