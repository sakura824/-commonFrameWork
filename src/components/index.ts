//全局组件
import SvgIncon from './SvgIcon.vue'

import type { App, Component } from 'vue';
interface Components {
    [name: string]: Component
}
const components: Components = {
    SvgIncon
}

export default {
    install(app: App) {
        Object.keys(components).forEach((item: string) => {
            app.component(item, components[item])
        })
    }
}