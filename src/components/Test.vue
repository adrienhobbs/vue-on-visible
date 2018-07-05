<template>
  <div v-show="rect"
       :style="{opacity}"
       v-on-visible="{callback: updateState, yoyo: true, offsets: {top: '-10%', bottom: '-5%'}}">
    <slot />
  </div>
</template>

<script>
const Ease = {
  linear: function (t) { return t }, 
  // accelerating from zero velocity 
  easeInQuad: function (t) { return t*t }, 
  // decelerating to zero velocity 
  easeOutQuad: function (t) { return t*(2-t) }, 
  // acceleration until halfway, then deceleration 
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }, 
  // accelerating from zero velocity  
  easeInCubic: function (t) { return t*t*t }, 
  // decelerating to zero velocity  
  easeOutCubic: function (t) { return (--t)*t*t+1 }, 
  // acceleration until halfway, then deceleration  
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }, 
  // accelerating from zero velocity  
  inQuart: function (t) { return t*t*t*t }, 
  // decelerating to zero velocity  
  outQuart: function (t) { return 1-(--t)*t*t*t }, 
  // acceleration until halfway, then deceleration 
  inOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }, 
  // accelerating from zero velocity 
  inQuint: function (t) { return t*t*t*t*t }, 
  // decelerating to zero velocity 
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t }, 
  // acceleration until halfway, then deceleration  
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t } 
}
export default {
  name: 'Test',
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      isVisible: null,
      intersectionRatio: null,
      isAbove: null,
      isBelow: null,
      isPartiallyAbove: null,
      isPartiallyBelow: null,
      rect:  null
    }
  },
  computed: {
    opacity() {
      return Ease.outQuart(this.intersectionRatio)
    },
    top() {
      return this.rect.top
    },
    bottom() {
      return this.rect.bottom
    }
  },
  methods: {
    updateState(item) {
      const {
        rect,
        isAbove, 
        isBelow, 
        isPartiallyAbove, 
        isPartiallyBelow, 
        isVisible, 
        intersectionRatio,
      } = item
      
      this.isVisible = isVisible
      this.isAbove = isAbove
      this.isBelow = isBelow
      this.rect = rect
      this.intersectionRatio = intersectionRatio
      this.isPartiallyAbove = isPartiallyAbove
      this.isPartiallyBelow = isPartiallyBelow
    }
  }
}
</script>

