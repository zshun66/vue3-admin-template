<script setup name="login">
import useUserStore from '@/pinia/modules/user.js'
import { findFieldValueInTree } from '@/utils/treehandler.js'

const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()

// 表单实例
const loginFormRef = ref(null)
// 登陆表单
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
// 登陆表单验证规则
const loginFormRules = reactive({
  username: [
    { required: true, min: 2, message: '账号长度至少2位', trigger: 'change' }
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
const handleLogin = async () => {
  let valid = await loginFormRef.value.validate().catch(err => {})
  if (!valid) return
  loginBtnLoading.value = true
  userStore.handleUserLogin(loginForm).then((userInfo) => {
    ElMessage.success('登录成功')
    const isRedirect = findFieldValueInTree({
      data: userInfo.menus,
      targetKey: 'path',
      targetValue: redirect
    })
    const toPath = (isRedirect && redirect) ? redirect : userInfo.jump
    $router.push({ path: toPath })
    loginBtnLoading.value = false
  }).catch(() => {
    loginBtnLoading.value = false
  })
}
</script>

<template>
  <div
    class="page_container login_page"
    tabindex="1"
    @keyup.enter="handleLogin"
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
          <el-input v-model="loginForm.username" placeholder="用户名：admin / zhangsan / lisi / wangwu">
            <template #prefix>
              <svg-icon name="user2" size="18px" color="#666666"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码：111111" show-password>
            <template #prefix>
              <svg-icon name="password1" size="20px" color="#333333"></svg-icon>
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
.login_page {
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
  .login_page {
    .login_form_box {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

@media screen and (max-width: 768px) {
  .login_page {
    .login_form_box {
      width: 85%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>