<script setup name="TagsView">
import useTagStore from '@/pinia/modules/tag.js'
import { requestFullscreen } from '@/utils/fullscreen.js'

const $route = useRoute()
const $router = useRouter()
const tagStore = useTagStore()
const refreshPage = inject('refreshPage')

let containerWidth = 0
let tagsWrapWidth = 0
let minLeft = 0
const left = ref(0)
const showRightClickMenu = ref(false)
const position = ref({ left: 0, top: 0 })
const currRouteName = ref('')
let currTagPage = null
let currIndex = 0
const showMaximize = ref(false)

const tagPages = computed(() => tagStore.tagPages)

onMounted(() => {
  window.addEventListener('resize', getDomInfo, true)
})

onUnmounted(() => {
  window.removeEventListener('resize', getDomInfo, true)
})

watch(() => $route.path, (newv, oldv) => {
  currRouteName.value = $route.name || ''
  tagStore.addTagPage({
    title: $route.meta.title,
    name: $route.name,
    path: $route.path,
    isClearable: $route.meta.isClearable,
    isCache: $route.meta.isCache,
  })
  nextTick(() => getDomInfo())
}, { immediate: true })

watch(tagPages, (newv, oldv) => {
  nextTick(() => getDomInfo())
}, { deep: true })

// 获取Dom信息
const getDomInfo = () => {
  const containerDom = document.querySelector('.tags_view_comp')
  const tagsWrapDom = document.querySelector('.tags_view_comp .tags_wrap')
  const activeTagItemDom = document.querySelector('.tags_view_comp .tags_wrap .tags_item.active')
  containerWidth = containerDom.offsetWidth
  tagsWrapWidth = tagsWrapDom.offsetWidth
  tagsWrapDom.classList.add('transition')
  setTimeout(() => tagsWrapDom.classList.remove('transition'), 300)
  minLeft = containerWidth - tagsWrapWidth
  if (minLeft > 0) minLeft = 0
  if (activeTagItemDom) {
    let centerPos = containerWidth / 2
    let activeTagItemOffsetW = activeTagItemDom.offsetWidth
    let activeTagItemOffsetL = activeTagItemDom.offsetLeft
    left.value = centerPos - (activeTagItemOffsetL + activeTagItemOffsetW / 2)
    if (left.value > 0) left.value = 0
    if (left.value < minLeft) left.value = minLeft
  }
}

// 处理点击关闭图标
const handleClickCloseIcon = (item, index) => {
  if (item.name === currRouteName.value) {
    if (index === 0 && tagPages.value.length >= 2) {
      $router.push(tagPages.value[index + 1].path)
    } else if (index > 0) {
      $router.push(tagPages.value[index - 1].path)
    }
  }
  tagStore.removeTagPage(index)
}

// 处理鼠标滚轮事件
const handleMouseWheel = (e) => {
  if (containerWidth >= tagsWrapWidth) return
  left.value += e.wheelDelta / 5
  if (left.value > 0) left.value = 0
  if (left.value < minLeft) left.value = minLeft
}

// 点击标签页
const handleClickTagItem = (item) => {
  if (item.name === currRouteName.value) return
  $router.push(item.path)
}

// 右键事件
const handleContextmenu = (e, item, index) => {
  currTagPage = item
  currIndex = index
  position.value.left = e.clientX
  position.value.top = e.clientY
  showRightClickMenu.value = true
}

// 处理各种关闭操作
const handleCloseOperate = (type) => {
  showRightClickMenu.value = false
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
    handleClickCloseIcon(currTagPage, currIndex)
  } else if (type === 'other') {
    if (currTagPage.name !== currRouteName) {
      $router.push(currTagPage.path)
    }
    tagStore.closeOtherTagPage(currTagPage)
  } else if (type === 'left') {
    tagStore.closeLeftTagPage(currIndex)
  } else if (type === 'right') {
    tagStore.closeRightTagPage(currIndex)
  } else if (type === 'left') {
    tagStore.closeAllTagPage()
  }
}

// 处理退出最大化
const handleExitMaximize = () => {
  const asideDom = document.querySelector('aside.el-aside.layout_aside')
  const headerDom = document.querySelector('header.el-header.layout_header')
  asideDom.style.display = 'block'
  headerDom.style.display = 'block'
  showMaximize.value = false
}
</script>

<template>
  <div class="comp_container tags_view_comp">
    <div class="tags_wrap" :style="{ transform: `translateX(${left}px)` }" @mousewheel.passive="handleMouseWheel">
      <div class="tags_item" :class="{ active: currRouteName === item.name }" v-for="(item, index) in tagPages" :key="index"
      @click="handleClickTagItem(item)" @contextmenu.prevent="handleContextmenu($event, item, index)">
        <span class="title">{{ item.title }}</span>
        <el-icon class="close_icon" @click.stop="handleClickCloseIcon(item, index)" v-if="item.isClearable == '1'"><Close /></el-icon>
      </div>
    </div>

    <div class="right_click_menu_mask" @click="showRightClickMenu = false"
    @contextmenu.prevent="showRightClickMenu = false" v-if="showRightClickMenu"></div>
    <div class="right_click_menu_box" :style="{ left: position.left + 'px', top: position.top + 'px' }" v-if="showRightClickMenu">
      <div class="right_click_menu_item" @click="handleCloseOperate('refresh')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="refresh2" size="16px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">刷新页面</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('fullscreen')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="fullscreen2" size="13px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">屏幕全屏</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('maximize')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="fullscreen2" size="13px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">窗口全屏</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('curr')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="close4" size="15px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">关闭当前</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('other')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="close1" size="15px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">关闭其他</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('left')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="left-arrow1" size="17px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">关闭左侧</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('right')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="right-arrow1" size="17px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">关闭右侧</span>
      </div>
      <div class="right_click_menu_item" @click="handleCloseOperate('all')">
        <div class="right_click_menu_item_icon_box">
          <svg-icon class="right_click_menu_item_icon" name="close3" size="15px"></svg-icon>
        </div>
        <span class="right_click_menu_item_text">关闭全部</span>
      </div>
    </div>

    <teleport to="body">
      <div id="exit_maximize_box" title="退出最大化" @click="handleExitMaximize" v-if="showMaximize">
        <svg-icon class="exit_icon" name="exit1" size="19px"></svg-icon>
      </div>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.tags_view_comp {
  width: 100%;
  overflow: hidden;

  .tags_wrap {
    display: inline-flex;
    align-items: center;

    &.transition {
      transition: transform 0.3s;
    }

    .tags_item {
      height: 28px;
      display: flex;
      align-items: center;
      padding: 0px 10px;
      background-color: var(--theme-tagbar-tagpage-bg-color);
      border: 1px solid var(--theme-tagbar-tagpage-border-color);
      border-radius: 4px;
      cursor: pointer;

      .title {
        font-size: 14px;
        color: var(--theme-tagbar-tagpage-font-color);
        white-space: nowrap;
      }

      .close_icon {
        margin-left: 5px;
        margin-right: -3px;
        width: 16px;
        height: 16px;
        font-size: 12px;
        color: var(--theme-tagbar-tagpage-font-color);
        border-radius: 50%;
      }

      .close_icon:hover {
        color: var(--theme-tagbar-tagpage-close-icon-hover-font-color);
        background: var(--theme-tagbar-tagpage-close-icon-hover-bg-color);
      }
    }

    .tags_item.active {
      background-color: var(--theme-tagbar-tagpage-active-bg-color);
      border: 1px solid var(--theme-tagbar-tagpage-active-border-color);

      .title {
        color: var(--theme-tagbar-tagpage-active-font-color);
      }

      .close_icon {
        color: var(--theme-tagbar-tagpage-active-font-color);
      }
    }

    .tags_item + .tags_item{
      margin-left: 5px;
    }
  }

  .right_click_menu_mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
  }

  .right_click_menu_box {
    position: fixed;
    z-index: 10;
    background-color: var(--theme-tagbar-menu-bg-color);
    font-size: 15px;
    padding: 7px 0px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px -5px var(--theme-tagbar-menu-shadow-color);

    .right_click_menu_item {
      padding: 5px 15px 5px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;

      .right_click_menu_item_icon_box {
        --size: 18px;
        width: var(--size);
        height: var(--size);
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-left: -2px;
        margin-right: 5px;

        .right_click_menu_item_icon {
          fill: var(--theme-tagbar-menuitem-font-color);
        }
      }

      .right_click_menu_item_text {
        color: var(--theme-tagbar-menuitem-font-color);
      }
    }

    .right_click_menu_item:hover {
      background-color: var(--theme-tagbar-menuitem-hover-bg-color);

      .right_click_menu_item_icon {
        fill: var(--theme-tagbar-menuitem-hover-font-color);
      }

      .right_click_menu_item_text {
        color: var(--theme-tagbar-menuitem-hover-font-color);
      }
    }
  }
}
</style>

<style lang="scss">
#exit_maximize_box {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 99999;
  background: #909399;
  opacity: 0.9;
  cursor: pointer;

  &:hover {
    background-color: #73767a;
  }

  .exit_icon {
    position: relative;
    top: 52%;
    left: 15%;
    font-size: 14px;
    fill: #ffffff;
    transform: rotate(180deg);
  }
}
</style>