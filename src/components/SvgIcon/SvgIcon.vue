<template>
  <svg
    class="svg-icon"
    :style="{
      width: width ? width : size,
      minWidth: width ? width : size,
      height: height ? height : size
    }"
    :fill="color"
  >
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: '',
    required: true
  },
  color: {
    type: String,
    default: '#505050'
  },
  size: {
    type: String,
    default: '1em'
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>