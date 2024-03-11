/**
 * v-copy
 * 复制指令
 */
import { ElMessage } from 'element-plus'

export default {
  mounted(el, binding) {
    el.copyText = binding.value
    el.addEventListener('click', handleClick)
  },
  updated(el, binding) {
    el.copyText = binding.value
  },
  beforeUnmount(el) {
    el.removeEventListener('click', handleClick)
  }
}

function handleClick() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(this.copyText).then(() => {
      ElMessage.success('复制成功')
      this.dispatchEvent(new Event('copy-success'))
    }).catch(err => {
      ElMessage.error('复制失败')
      this.dispatchEvent(new Event('copy-fail'))
    })
  } else {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = this.copyText
      textarea.style.position = 'fixed'
      textarea.style.opacity = 0
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      ElMessage.success('复制成功')
      this.dispatchEvent(new Event('copy-success'))
    } catch (error) {
      ElMessage.error('复制失败')
      this.dispatchEvent(new Event('copy-fail'))
    }
  }
}