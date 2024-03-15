<script setup name="Contextmenu">
import Maximize from '../Maximize/Maximize.vue'
import useTagStore from '@/pinia/modules/tag.js'
import { requestFullscreen } from '@/utils/fullscreen.js'

const $route = useRoute()
const $router = useRouter()
const tagStore = useTagStore()

const $props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  tag: {
    type: Object,
    default: () => ({})
  },
  idx: {
    type: Number,
    default: 0
  }
})
const $emits = defineEmits(['update:show'])
const refreshPage = inject('refreshPage')

// 右键菜单选项
const options = [
  { title: '刷新页面', name: 'refresh', iconName: 'refresh2', iconSize: '16px' },
  { title: '屏幕全屏', name: 'fullscreen', iconName: 'fullscreen2', iconSize: '13px' },
  { title: '窗口全屏', name: 'maximize', iconName: 'fullscreen2', iconSize: '13px' },
  { title: '关闭当前', name: 'closeCurr', iconName: 'close4', iconSize: '15px' },
  { title: '关闭其他', name: 'closeOther', iconName: 'close1', iconSize: '15px' },
  { title: '关闭左侧', name: 'closeLeft', iconName: 'left-arrow1', iconSize: '17px' },
  { title: '关闭右侧', name: 'closeRight', iconName: 'right-arrow1', iconSize: '17px' },
  { title: '关闭全部', name: 'closeAll', iconName: 'close3', iconSize: '15px' },
]

// 关闭右键菜单
const handleClose = () => {
  $emits('update:show', false)
}

// 处理各种操作
const handleOperate = (type) => {
  $emits('update:show', false)

  if (type === 'refresh') {
    refreshPage()
  } else if (type === 'fullscreen') {
    requestFullscreen('main.el-main.layout_main')
  } else if (type === 'maximize') {
    const asideDom = document.querySelector('aside.el-aside.layout_aside')
    const headerDom = document.querySelector('header.el-header.layout_header')
    asideDom.style.display = 'none'
    headerDom.style.display = 'none'
    showMaximize.value = true
  } else if (type === 'curr') {
    // handleClickCloseIcon(currTagPage, currIndex)
  } else if (type === 'other') {
    // if (currTagPage.name !== currRouteName) {
    //   $router.push(currTagPage.path)
    // }
    // tagStore.closeOtherTagPage(currTagPage)
  } else if (type === 'left') {
    tagStore.closeLeftTagPage(currIndex)
  } else if (type === 'right') {
    tagStore.closeRightTagPage(currIndex)
  } else if (type === 'left') {
    tagStore.closeAllTagPage()
  }
}
</script>

<template>
  <div class="comp_container contextmenu_comp" v-if="show">
    <div class="contextmenu_mask" @click="handleClose" @contextmenu.prevent="handleClose"></div>
    <div class="contextmenu_box" :style="{ left: left + 'px', top: top + 'px' }">
      <div class="contextmenu_item" @click="handleOperate(item.name)" v-for="item in options" :key="item.name">
        <div class="contextmenu_item_icon_box">
          <svg-icon class="contextmenu_item_icon" :name="item.iconName" :size="item.iconSize"></svg-icon>
        </div>
        <span class="contextmenu_item_text">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contextmenu_comp {
  width: 0;
  height: 0;

  .contextmenu_mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
  }

  .contextmenu_box {
    position: fixed;
    z-index: 10;
    background-color: var(--theme-tagbar-menu-bg-color);
    font-size: 15px;
    padding: 7px 0px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px -5px var(--theme-tagbar-menu-shadow-color);

    .contextmenu_item {
      padding: 5px 15px 5px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;

      .contextmenu_item_icon_box {
        --size: 18px;
        width: var(--size);
        height: var(--size);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;

        .contextmenu_item_icon {
          fill: var(--theme-tagbar-menuitem-font-color);
        }
      }

      .contextmenu_item_text {
        white-space: nowrap;
        color: var(--theme-tagbar-menuitem-font-color);
      }
    }

    .contextmenu_item:hover {
      background-color: var(--theme-tagbar-menuitem-hover-bg-color);

      .contextmenu_item_icon_box {
        .contextmenu_item_icon {
          fill: var(--theme-tagbar-menuitem-hover-font-color);
        }
      }

      .contextmenu_item_text {
        color: var(--theme-tagbar-menuitem-hover-font-color);
      }
    }
  }
}
</style>