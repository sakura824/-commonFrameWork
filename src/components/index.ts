//全局组件
import SvgIncon from './SvgIcon.vue'
import FormSearch from './formSearch/index.vue'
import Table from './table/index.vue'
import Dialog from './dialog/index.vue'

import type { App, Component } from 'vue';
interface Components {
    [name: string]: Component
}
const components: Components = {
    SvgIncon,
    FormSearch,
    Table,
    Dialog
}

export default {
    install(app: App) {
        Object.keys(components).forEach((item: string) => {
            app.component(item, components[item])
        })
    }
}