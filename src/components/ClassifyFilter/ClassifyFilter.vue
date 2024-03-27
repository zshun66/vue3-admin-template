<script setup name="ClassifyFilter">
const $props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => ([])
  },
  multiple: {
    type: Boolean,
    default: false
  },
  allLabel: {
    type: String,
    default: '全部'
  },
  allValue: {
    type: String,
    default: ''
  }
})
const $emits = defineEmits([
  'update:modelValue',
])

$props.options.unshift({
  label: $props.allLabel,
  value: $props.allValue
})

const handleTagEffect = (item) => {
  const value = $props.modelValue
  if ($props.multiple) {
    if (
      (!value || value.length == 0) &&
      item.value == $props.allValue
    ) return 'dark'
    else if (value && value.includes(item.value)) return 'dark'
    else return 'light'
  } else {
    if (!value && item.value == $props.allValue) return 'dark'
    else if (value && value === item.value) return 'dark'
    else return 'light'
  }
}

const handleClickTag = (item) => {
  if ($props.multiple) {
    let value = [...($props.modelValue || [])]
    if (item.value === $props.allValue) {
      value = [$props.allValue]
    } else {
      value = value.filter(v => v !== $props.allValue)
      const isExist = value.includes(item.value)
      if (isExist) value = value.filter(v => v !== item.value)
      else value.push(item.value)
    }
    if (value.length === 0) value = [$props.allValue]
    $emits('update:modelValue', value)
  } else {
    $emits('update:modelValue', item.value)
  }
}
</script>

<template>
  <div class="comp_container classify_filter_comp">
    <div class="classify_filter_wrap">
      <div class="classify_title">{{ title }}</div>
      <el-scrollbar>
        <el-tag
          class="option_item" type="primary" round :hit="false"
          disable-transitions :closable="false"
          :effect="handleTagEffect(item)"
          v-for="(item, index) in options" :key="index"
          @click="handleClickTag(item)"
        >
          <span class="icon" v-if="item.iconName">
            <el-icon :size="item.iconSize || '14px'" v-if="item.iconType === 'ele'">
              <component :is="item.iconName" />
            </el-icon>
            <svg-icon :name="item.iconName" :size="item.iconSize || '14px'"
            v-if="item.iconType === 'svg'"></svg-icon>
          </span>
          <span class="label">{{ item.label }}</span>
        </el-tag>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.classify_filter_comp {
  
  .classify_filter_wrap {
    display: flex;
    align-items: center;

    .classify_title {
      margin-right: 10px;
      white-space: nowrap;
      font-size: 15px;
    }

    .option_item {
      cursor: pointer;
      height: 28px;
      padding: 0px 16px;

      .icon {
        margin-right: 5px;

        :deep(.svg-icon) {
          fill: var(--el-tag-text-color);
        }
      }

      :deep(.el-tag__content) {
        display: flex;
        align-items: center;
      }
    }

    .option_item + .option_item {
      margin-left: 15px;
    }
  }
}
</style>