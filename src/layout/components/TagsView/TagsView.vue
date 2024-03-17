<script setup name="TagsView">
import Contextmenu from '../Contextmenu/Contextmenu.vue'
import useTagStore from '@/pinia/modules/tag.js'

const $route = useRoute()
const $router = useRouter()
const tagStore = useTagStore()

let containerWidth = 0
let tagsWrapWidth = 0
let minLeft = 0
const left = ref(0)
// 当前路由名称
const currRouteName = ref('')
// 是否显示右键菜单
const showContextmenu = ref(false)
// 右键菜单的显示位置信息
const position = ref({ left: 0, top: 0 })
// 当前操作的标签页对象
let currTagPage = ref(null)
// 当前操作的标签页索引
let currTagIndex = ref(0)

const tagPages = computed(() => tagStore.tagPages)

onMounted(() => window.addEventListener('resize', getDomInfo, true))
onUnmounted(() => window.removeEventListener('resize', getDomInfo, true))

watch(() => $route.path, (newv, oldv) => {
  currRouteName.value = $route.name || ''
  tagStore.addTagPageByItem({
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

// 处理鼠标滚轮事件
const handleMouseWheel = (e) => {
  if (containerWidth >= tagsWrapWidth) return
  left.value += e.wheelDelta / 5
  if (left.value > 0) left.value = 0
  if (left.value < minLeft) left.value = minLeft
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
  tagStore.removeTagPageByIndex(index)
}

// 点击标签页
const handleClickTagItem = (item) => {
  if (item.name === currRouteName.value) return
  $router.push(item.path)
}

// 右键事件
const handleContextmenu = (event, item, index) => {
  position.value.left = event.clientX
  position.value.top = event.clientY
  currTagPage.value = item
  currTagIndex.value = index
  showContextmenu.value = true
}
</script>

<template>
  <div class="comp_container tags_view_comp">
    <div
      class="tags_wrap"
      :style="{ transform: `translateX(${left}px)` }"
      @mousewheel.passive="handleMouseWheel"
    >
      <div
        class="tags_item"
        :class="{ active: currRouteName === item.name }"
        v-for="(item, index) in tagPages"
        :key="index"
        @click="handleClickTagItem(item)"
        @contextmenu.prevent="handleContextmenu($event, item, index)"
      >
        <span class="title">{{ item.title }}</span>
        <el-icon
          class="close_icon"
          @click.stop="handleClickCloseIcon(item, index)"
          v-if="item.isClearable == '1'"
        ><Close /></el-icon>
      </div>
    </div>

    <Contextmenu
      v-model:show="showContextmenu"
      :left="position.left"
      :top="position.top"
      :tag="currTagPage"
      :idx="currTagIndex"
    ></Contextmenu>
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
}
</style>