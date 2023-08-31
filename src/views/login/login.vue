<script setup name="login">
import useUserStore from '@/pinia/modules/user.js'

const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()

// 登陆表单
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
// 登陆表单验证规则
const loginFormRules = reactive({
  username: [
    { required: true, min: 5, message: '账号长度至少5位', trigger: 'change' }
  ],
  password: [
    { required: true, min: 6, message: '密码长度至少6位', trigger: 'change' }
  ]
})
// 登录按钮加载状态
const loginBtnLoading = ref(false)
// 登陆后重定向地址
const redirect = $route.query?.redirect

// 处理登录
const handleLogin = () => {
  loginBtnLoading.value = true
  userStore.handleUserLogin(loginForm).then(() => {
    ElMessage({
      type: 'success',
      message: '登录成功',
    })
    $router.push({ path: redirect || '/backstage' })
    loginBtnLoading.value = false
  }).catch(() => {
    loginBtnLoading.value = false
  })
}
</script>

<template>
  <div
    class="page_container login_container"
    tabindex="1"
    @keyup.enter.native="handleLogin"
  >
    <div class="login_form_box">
      <h1 class="title">Hello，欢迎进入系统</h1>
      <el-form
        class="login_form"
        ref="loginFormRef"
        size="large"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>
              <icon-user theme="outline" size="18" fill="#666" :strokeWidth="4" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" show-password>
            <template #prefix>
              <icon-lock theme="outline" size="18" fill="#666" :strokeWidth="4" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="login_btn"
        type="primary"
        size="large"
        auto-insert-space
        :loading="loginBtnLoading"
        @click="handleLogin"
      >登录</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login_page_bg.jpg') no-repeat;
  background-size: cover;

  .login_form_box {
    width: 500px;
    height: 350px;
    background: url('@/assets/images/login_form_bg.png') no-repeat;
    background-size: cover;
    padding: 40px 40px;
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(0%, -50%);
    .title {
      font-size: 30px;
      color: #fff;
    }
    .login_form {
      margin-top: 30px;
    }
    .login_btn {
      width: 100%;
      font-size: 18px;
    }
    :deep(.el-form-item--large) {
      margin-bottom: 35px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .login_container {
    .login_form_box {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

@media screen and (max-width: 768px) {
  .login_container {
    .login_form_box {
      width: 85%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>