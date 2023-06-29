import { defineStore } from "pinia";
import { ref } from "vue";

export const useWssStore = defineStore('wss', () => {
    const message = ref<number>(0)
    let peopleMsg = ref<number[]>([])
    const getMessage = (msg: number) => {
        message.value = msg
    }
    const getPeopleMsg = (msg: number[]) => {
        peopleMsg.value = msg   //直接复制引用数据类型不能用reactive定义
    }
    return {
        getPeopleMsg,
        getMessage,
        message,
        peopleMsg
    }
})
