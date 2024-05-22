<script setup name="ECharts">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { debounce } from '@/utils/index.js'

const $props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
})
const $emits = defineEmits([
  
])

// 容器实例
const echartRef = ref(null)
// 图表实例对象
const echartInstance = ref(null)

const initECharts = () => {
  if (!echartRef.value) return
  echartInstance.value = echarts.getInstanceByDom(echartRef.value)
  if (!echartInstance.value) {
    // 初始化配置项详情参见：https://echarts.apache.org/zh/api.html#echarts.init
    echartInstance.value = markRaw(echarts.init(echartRef.value, null, {
      devicePixelRatio: window.devicePixelRatio,
      renderer: 'canvas',
      ssr: false,
      useDirtyRect: false,
      useCoarsePointer: null,
      pointerSize: null,
      width: null,
      height: null,
      locale: 'ZH'
    }))
    drawECharts()
  }
}

const drawECharts = () => {
  if (!echartInstance.value) return
  echartInstance.value.setOption($props.option, { notMerge: false })
}

const handleDebounceResize = debounce(() => {
  if (echartInstance.value) {
    echartInstance.value.resize({ animation: { duration: 300 } })
  }
}, 300, false)

onMounted(() => {
  initECharts()
  window.addEventListener('resize', handleDebounceResize)
})

onBeforeUnmount(() => {
  echartInstance.value?.dispose()
  window.removeEventListener('resize', handleDebounceResize)
})

defineExpose({
  getInstance: () => echartInstance.value,
})
</script>

<template>
  <div class="comp_container echarts_comp" ref="echartRef"></div>
</template>

<style scoped lang="scss">
.echarts_comp {
  width: 100%;
  height: 100%;
}
</style>