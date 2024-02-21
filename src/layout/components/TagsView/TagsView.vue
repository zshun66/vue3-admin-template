<script setup name="TagsView">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

const tagPages = computed(() => appStore.tagPages)

let containerWidth = 0
let tagsWrapWidth = 0
let minLeft = 0
let left = ref(0)

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize, true)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize, true)
})

const handleResize = () => {
  const containerDom = document.querySelector('.tags_view_comp')
  const tagsWrapDom = document.querySelector('.tags_view_comp .tags_wrap')
  containerWidth = containerDom.offsetWidth
  tagsWrapWidth = tagsWrapDom.offsetWidth
  minLeft = containerWidth - tagsWrapWidth
  if (left.value < minLeft) left.value = minLeft
}

// 处理点击关闭图标
const handleClickCloseIcon = (index) => {
  appStore.removeTagPage(index)
}

// 处理鼠标滚轮事件
const handleMouseWheel = (e) => {
  if (containerWidth >= tagsWrapWidth) return
  left.value += e.wheelDelta / 5
  if (left.value > 0) left.value = 0
  if (left.value < minLeft) left.value = minLeft
}
</script>

<template>
  <div class="comp_container tags_view_comp">
    <div
      class="tags_wrap"
      :style="{ transform: `translateX(${left}px)` }"
      @mousewheel="handleMouseWheel"
    >
      <div
        class="tags_item"
        v-for="(item, index) in tagPages"
        :key="index"
      >
        <span class="title">{{ item.title }}</span>
        <el-icon
          class="close_icon"
          v-if="item.isClearable == '1'"
          @click.stop="handleClickCloseIcon(index)"
        >
          <Close />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags_view_comp {
  width: 100%;
  overflow: hidden;

  .tags_wrap {
    display: inline-flex;
    align-items: center;

    .tags_item {
      height: 28px;
      display: flex;
      align-items: center;
      padding: 0px 7px 0px 10px;
      border: 1px solid var(--theme-header-tag-border-color);
      border-radius: 4px;
      cursor: pointer;

      .title {
        font-size: 14px;
        color: var(--theme-header-tag-font-color);
        white-space: nowrap;
      }

      .close_icon {
        margin-left: 5px;
        width: 16px;
        height: 16px;
        font-size: 12px;
        color: var(--theme-header-tag-font-color);
        border-radius: 50%;
      }

      .close_icon:hover {
        color: var(--theme-header-tag-icon-hover-font-color);
        background: var(--theme-header-tag-icon-hover-bg-color);
      }
    }

    .tags_item + .tags_item{
      margin-left: 5px;
    }
  }
}
</style>