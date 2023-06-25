/**
 * 配置全局自定义指令
 * modules文件夹内统一管理全局指令
 **/
import { type App } from "vue"
const files: Record<string, any> = import.meta.glob('./modules/**/*.ts', { eager: true })
const modules = {}
Object.entries(files).forEach(key => {
    const match = key[0].match(/(?<=modules\/).*?(?=\..+$)/);
    if (match) {
        modules[match[0]] = key[1].default;
    }
})

export function loadDirectives(app: App) {
    Object.keys(modules).forEach(key => {
        app.directive(key, modules[key])
    })
}

 

