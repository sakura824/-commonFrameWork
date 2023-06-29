import { store } from "@/store"
import { io } from "socket.io-client"
const wssStore = store.useWssStore()
let socket: any
export const initSocket = (userId: number) =>  {
    socket = io("ws://172.20.4.100:3333", 
    {
        // transports: ['websocket'], // 指定传输方式，如WebSocket
        autoConnect: true, // 是否自动连接
        reconnection: true, // 是否自动重新连接
        // reconnectionAttempts: 3, // 重新连接尝试次数
        // reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
        extraHeaders: { //不能只设置transports传输方式为websocket，不然服务端拿不到请求头，socket.io文档里有说明
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        },
        query: { userId }, // 自定义查询参数
      }
    )
    registerEvents(socket)
}
 
const registerEvents = (socket: any) => {
    // socket.on("connect", () => {
    // });
    socket.on('message', (data: number) => {
        wssStore.getMessage(data)
    });
    socket.on('PIE_MESSAGE', (data: any) => {
        wssStore.getPeopleMsg(data)
    });
} 