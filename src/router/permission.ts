import { store } from '@/store'
import router from './index.ts'
import NProgress from "nprogress";
import "nprogress/nprogress.css"; 

NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示
// 访问权限控制 (结合路由守卫搞定页面跳转权限控制)
router.beforeEach( async (to) => {
    const userStore = store.useUserStore()
    // 进入路由之前开启进度条
    NProgress.start()
  //   console.log('to', to)
    // 判断token是否存在
    const token = window.localStorage.getItem('token')
    // 通过白名单控制不需要登录的页面
    const whiteList = ['/login']
    if(token) {
      await userStore.getUser()
      // 如果不在白名单且没有登录, 跳转到登录页面
    } else if(!token && !whiteList.includes(to.path)) {
        ElNotification({
          title: '错误',
          message: '您暂无权限访问，请登录重试',
          type: 'error',
        })
        return '/login'
    }
  })
  
  router.afterEach((to) => {
    // 处理标题
    document.title = `后台管理系统`
    // 进入页面之后 关闭进度条
    NProgress.done()
  })