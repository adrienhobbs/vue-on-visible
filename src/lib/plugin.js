import * as Components from './index'
import Vue from 'vue'

const OnVisiblePlugin = {
  install: function() {
    Object.keys(Components)
      .filter(componentName => componentName !== 'default')
      .forEach(componentName => {
        Vue.component(componentName, Components[componentName])
      })
  }
}

export default OnVisiblePlugin
