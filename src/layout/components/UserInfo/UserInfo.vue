<script setup name="UserInfo">
import useUserStore from '@/pinia/modules/user.js'

const $router = useRouter()
const userStore = useUserStore()

const { avatar, nickname, username } = userStore

const handleCommand = function (command) {
  // 个人中心
  if (command === 'personal-center') {

  }
  // 退出登录
  else if (command === 'logout') {
    ElMessageBox.confirm('确认退出登录?', '提示', {
      type: 'warning',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          userStore.handleUserLogout().then(res => {
            $router.replace(`/login?redirect=${$router.currentRoute.value.path}`)
            ElMessage.success('退出成功')
            instance.confirmButtonLoading = false
            done()
          }).catch(err => {
            instance.confirmButtonLoading = false
          })
        } else if (action !== 'confirm') {
          if (!instance.confirmButtonLoading) done()
        }
      }
    }).catch(err => {})
  }
}
</script>

<template>
  <el-dropdown
    placement="bottom"
    trigger="hover"
    :show-timeout="0"
    :hide-timeout="0"
    :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -8],
          },
        },
      ]
    }"
    :teleported="false"
    @command="handleCommand"
  >
    <div class="comp_container userinfo_comp">
      <el-avatar class="user_avatar" :size="30" :src="avatar" />
      <span class="user_name">{{ nickname }}({{ username }})</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="option_list">
        <el-dropdown-item class="option_item" command="personal-center">
          <div class="option_icon">
            <svg-icon name="user2" size="16px" color="#777777"></svg-icon>
          </div>
          <span class="option_name">个人中心</span>
        </el-dropdown-item>
        <el-dropdown-item class="option_item" command="logout">
          <div class="option_icon">
            <svg-icon name="logout1" size="15px" color="#777777"></svg-icon>
          </div>
          <span class="option_name">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.userinfo_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 16px;
  color: var(--theme-navbar-font-color);

  .user_avatar {
  }

  .user_name {
    margin-left: 8px;
  }
}

:deep(.option_list) {
  .option_item {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 36px;
    padding: 0px 20px;
    color: #777777;

    .option_icon {
      width: 16px;
      text-align: center;
    }

    .option_name {
      margin-top: 0px;
      margin-left: 7px;
    }
  }

  .option_item:hover {
    background: var(--el-color-primary-light-9);
  }
}
</style>