import { defineStore } from "pinia";
import { login, loginOut, getUserInfo } from "@/api/modules/login.ts";
import { reactive, ref } from "vue";
import { useRouter, RouteRecordRaw } from 'vue-router'
import { UserInfo } from '@/interfaces/user'
import { asyncRoutes } from "@/router";
import { ResponseParams } from '@/interfaces/common'

interface RouteInfo {
    buttons: string[];
    routes: RouteRecordRaw[],
    roles: string[],
    avatar: string
    name: string
}


export const useUserStore = defineStore('user', () => {
    const token = ref<string>('')
    const routeInfo = reactive<RouteInfo>({
        buttons: [],
        routes: [],
        roles: [],
        avatar: "",
        name: ""
    })
    const router = useRouter()
    //登录
    const loginFunc = async (info: UserInfo) => {
        const {code, message, data}: ResponseParams = await login(info)
        if(code === 200) {
            ElNotification({
                title: '提示',
                message: message || '登录成功',
                type: 'success',
              })
            token.value = data
            window.localStorage.setItem('token', token.value)
            return true
        } else {
            return false
        }
    }
    //登出
    const logOut = async () => {
        await loginOut()
        token.value = ''
        window.localStorage.removeItem('token')
        router.replace('/login')
    }
    //返回有权限路由
    const filterRoutes = (routes: RouteRecordRaw[], permissionRoutes: string[]) => {
        return routes.filter((item: any) => {
            if(permissionRoutes.includes(item.name)) {
                if(item.children && item.children.length > 0) {
                    item.children = filterRoutes(item.children, permissionRoutes)
                }
                return true
            } else {
                return false
            }
        })
    }
    //获取用户信息
    const getUser = async () => {
        const { code, data }: ResponseParams = await getUserInfo()
        if(code === 200) {
            routeInfo.name = data.name
            routeInfo.avatar = data.avatar
            routeInfo.buttons = data.buttons
            routeInfo.roles = data.roles
            routeInfo.routes = filterRoutes(asyncRoutes, data.routes)
            return data
        } else {
            return Promise.reject(data)
        }
    }
    return {
        routeInfo,
        token,
        loginFunc,
        logOut,
        getUser
    }
},
{
    // persist: {
    //     key: 'userInfo',
    //     storage: localStorage,
    //     // paths: ['token']  //无法分别设置指定存储在local还是session里
    // }
})
