<script setup name="Navbar">
import Toggle from '@/layout/components/Toggle/Toggle.vue'
import Fullscreen from '@/layout/components/Fullscreen/Fullscreen.vue'
import Theme from '@/layout/components/Theme/Theme.vue'
import Language from '@/layout/components/Language/Language.vue'
import Size from '@/layout/components/Size/Size.vue'
import Setting from '@/layout/components/Setting/Setting.vue'
import UserInfo from '@/layout/components/UserInfo/UserInfo.vue'
</script>

<template>
  <div class="comp_container navbar_comp">
    <div class="left_wrapper">
      <div class="toggle_box">
        <Toggle />
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
      <div class="toggle_size_box">
        <Size />
      </div>
      <div class="setting_box">
        <Setting />
      </div>
      <div class="userinfo_box">
        <UserInfo />
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
    .toggle_box {
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

    .toggle_size_box {}

    .setting_box {
      
    }

    .userinfo_box {
    }
  }
}
</style>