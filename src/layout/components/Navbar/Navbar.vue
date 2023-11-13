<script setup name="Navbar">
import Toggle from '@/layout/components/Toggle/Toggle.vue'
import Fullscreen from '@/layout/components/Fullscreen/Fullscreen.vue'
import Style from '@/layout/components/Style/Style.vue'
import Theme from '@/layout/components/Theme/Theme.vue'
import Language from '@/layout/components/Language/Language.vue'
import Size from '@/layout/components/Size/Size.vue'
import Setting from '@/layout/components/Setting/Setting.vue'
import UserInfo from '@/layout/components/UserInfo/UserInfo.vue'
</script>

<template>
  <div class="comp_container navbar_comp">
    <div class="left_wrapper">
      <Toggle />
    </div>
    <div class="right_wrapper">
      <Fullscreen />
      <Style />
      <Theme />
      <Language />
      <Size />
      <Setting />
      <UserInfo />
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
  }

  .right_wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
</style>