import { defineStore } from "pinia";
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', {
    state: () => {
        return {
            isCollapse: false, //展开菜单
            refresh: true//刷新
        }
    }, 

    // const isCollapse = ref(true)
    // return {
    //     isCollapse
    // }
})