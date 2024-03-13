/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
export default {
  mounted(el, binding) {
    // console.log(binding.value)
    // if (typeof binding.value !== 'function') {
    //   console.error('callback must be a function')
    //   return
    // }
    // let delay = binding.arg || 1000
    // let { before = false, after = false } = binding.modifiers
    // if ((!before && !after) || (before && after)) {
    //   before = true
    //   after = false
    // }
    // const callback = binding.value
    // let timer = null
    
    // el.__handleClick__ = function () {
    //   console.log(arguments)
    // }
    // el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.__handleClick__)
  }


  // mounted(el, binding) {
  //   if (typeof binding.value !== "function") {
  //     throw "callback must be a function";
  //   }
  //   let timer: NodeJS.Timeout | null = null;
  //   el.__handleClick__ = function () {
  //     if (timer) {
  //       clearInterval(timer);
  //     }
  //     timer = setTimeout(() => {
  //       binding.value();
  //     }, 500);
  //   };
  //   el.addEventListener("click", el.__handleClick__);
  // },
}
