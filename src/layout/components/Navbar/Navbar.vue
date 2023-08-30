<script setup name="Navbar">
import Fullscreen from '@/layout/components/Fullscreen/Fullscreen.vue'
import Theme from '@/layout/components/Theme/Theme.vue'
import Language from '@/layout/components/Language/Language.vue'
import Setting from '@/layout/components/Setting/Setting.vue'

// 菜单状态(shrink收缩、expand展开)
const menuStatus = ref('expand')
</script>

<template>
  <div class="comp_container navbar_comp">
    <div class="left_wrapper">
      <div class="toggle_menu" :title="menuStatus === 'shrink' ? '展开菜单' : '收缩菜单'">
        <icon-menu-unfold-one theme="filled" size="28" fill="#fff" :strokeWidth="3" v-if="menuStatus === 'expand'" />
        <icon-menu-fold-one theme="filled" size="28" fill="#fff" :strokeWidth="3" v-if="menuStatus === 'shrink'" />
      </div>
    </div>
    <div class="right_wrapper">
      <div class="toggle_screen_box">
        <Fullscreen />
      </div>
      <div class="toggle_theme_box">
        <Theme />
      </div>
      <div class="toggle_language_box">
        <Language />
      </div>
      <div class="setting_box">
        <Setting />
      </div>

      <div class="avatar_info_box">

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar_comp {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .left_wrapper {
    display: flex;
    align-items: center;
    .toggle_menu {
      padding: 0 10px;
      cursor: pointer;
    }
  }

  .right_wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;

    .toggle_screen_box {
    }

    .toggle_theme {
    }

    .toggle_language_box {
    }

    .setting_box {
      
    }

    .avatar_info_box {
      width: 150px;
    }
  }
}
</style>