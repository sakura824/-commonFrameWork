
<script setup lang="ts">
import { store } from "@/store/index";
import { reactive, ref } from 'vue'
import { UserInfo } from "@/interfaces/user";
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = store.useUserStore()
const userInfo = reactive<UserInfo>({ //登录信息
  username: 'admin',
  password: 'atguigu123', 
})
//校验
const validatePass = (_rule: any, value: string | any[], callback: (arg0?: Error) => void) => {
  if (value.length < 8) {
    callback(new Error('密码不能小于8位'))
  } else {
    callback()
  }
}
const rules = reactive({
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  password: [{ required: true, trigger: 'blur', validator: validatePass }]
})
const loading = ref(false)
const formRef = ref()
//登录
const onSubmit = () => {
  formRef.value.validate(async (v: boolean) => {
    if(v) {
      loading.value = true
      const res: boolean = await userStore.loginFunc(userInfo)
      if(res) {
        loading.value = false
        router.push('/')
      }
    }
  })
}
// const btn1 = () => {
//   userStore.logOut()
// }

</script>
<template>
  <div class="login-container">
    <el-form 
    class="login-form" 
    :model="userInfo" 
    :rules="rules"
    ref="formRef"
    label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">
        <span v-if="!loading">登录</span>
        <span v-else>登录中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/background.jpg');
  background-size: cover;
  .login-form {
    position: absolute;
    width: 25%;
    top: 30%;
    left: 60%;
    background-color: #fff;
    border-radius: 15px;
    padding: 40px;
  }
  .el-button {
    width: 100%;
  }
}
</style>
