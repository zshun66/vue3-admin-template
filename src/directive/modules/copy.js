/**
 * v-copy
 * 复制指令
 */
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
      this.dispatchEvent(new CustomEvent('copy-success', { detail: this.copyText }))
    }).catch(error => {
      this.dispatchEvent(new CustomEvent('copy-fail', { detail: error }))
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
      this.dispatchEvent(new CustomEvent('copy-success', { detail: this.copyText }))
    } catch (error) {
      this.dispatchEvent(new CustomEvent('copy-fail', { detail: error }))
    }
  }
}