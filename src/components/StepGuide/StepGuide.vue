<script setup name="StepGuide">
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const $props = defineProps({
  // 是否显示引导
  modelValue: {
    type: Boolean,
    default: false
  },
  // 查看官方文档：https://driverjs.com/docs/configuration
  config: {
    type: Object,
    default: () => ({})
  }
})
const $emits = defineEmits([
  'update:modelValue',
])

const onDestroyed = $props.config.onDestroyed
$props.config.onDestroyed = (element, step, options) => {
  onDestroyed && onDestroyed(element, step, options)
  $emits('update:modelValue', false)
}

let driverObj = null

onMounted(() => driverObj = driver($props.config))

watch(() => $props.modelValue, (newv, oldv) => {
  if (!driverObj) return
  if (newv) driverObj.drive()
  else driverObj.destroy()
}, { immediate: true })
</script>

<template>
  <div class="comp_container step_guide_comp"></div>
</template>

<style scoped lang="scss">
.step_guide_comp {
  width: 0;
  height: 0;
}
</style>