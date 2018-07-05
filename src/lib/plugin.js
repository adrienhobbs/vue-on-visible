import * as Components from './index'
import Vue from 'vue'
import observer from './observer'

const OnVisiblePlugin = {
  install: function() {
    Vue.directive('on-visible', {
      bind(elm, binding, vnode) {
        observer.observe({ elm, ...binding.value, vnode })
      },
      inserted(el) {}
    })
    Object.keys(Components)
      .filter(componentName => componentName !== 'default')
      .forEach(componentName => {
        Vue.component(componentName, Components[componentName])
      })
  }
}

export default OnVisiblePlugin
