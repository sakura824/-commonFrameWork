/** 按钮防抖 **/
export default {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        const _el = el
        if (!el.disabled) {
          _el.disabled = true
          setTimeout(() => {
            _el.disabled = false
          }, binding.value || 500) // 传入绑定值就使用，默认500毫秒内不可重复触发
        }
      })
    }
  }
  