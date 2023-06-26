import axios from 'axios'
import { store } from "../../store/index";

const baseURL = import.meta.env.VITE_APP_PROXY
const instance = axios.create({
    baseURL,
    timeout: 10000
})

//请求拦截器
instance.interceptors.request.use((config) => {
    //token
    const token = window.localStorage.getItem('token')
    if(token && config.headers) {
        config.headers.Token = token
    } 
    return config
}, 
    err => Promise.reject(err)
)
//相应拦截器
instance.interceptors.response.use((res: any) => {
    const userStore = store.useUserStore()
    if(Reflect.has(res, 'data') && res.data.code === 200) return res.data
    if(Reflect.has(res, 'data') && res.data.code === 401) {
        ElMessageBox.alert(res.data?.msg || getCodeMessage(res.statusText), '提示', {
            confirmButtonText: '确定',
            callback: () => {
                userStore.logOut()
            },
          })
          return res.data
    }
    if(Reflect.has(res, 'data') && res.data.code !== 200) {
        ElNotification({
            title: '错误',
            message: res.data?.msg || getCodeMessage(res.statusText) || res.data?.data || '异常错误，请重试',
            type: 'error',
          })
          return res.data
    }
    return res.data
},
    err => Promise.reject(err)
)

type codeType = {
    [x: number]: string
}
function getCodeMessage(code: number) {
    const codeMessage: codeType = {
        400: '错误请求',
        401: '未授权，请登录',
        403: '拒绝访问',
        404: '请求错误，未找到该资源',
        408: '请求超时',
        500: '服务端错误',
    }
    return codeMessage[code]
}

export default instance