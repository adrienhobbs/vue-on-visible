<template>
  <div v-on-visible="{onUpdate, offsets, yoyo}">
    <component :is="animationType"
               :viewport="viewport"
               :animationDuration="animationDuration">
      <slot />
    </component>
  </div>
</template>

<script>
import OnVisibleMixin from '../lib/Mixin'
import {Zoom, Slide, Fade} from './Animations'

export default {
  name: 'AnimateOnVisible',
  components: {Zoom, Slide, Fade},
  mixins: [OnVisibleMixin],
  props: {
    animationType: {
      type: String,
      default: 'zoom',
      required: false
    },
    animateAbove: {
      default: false,
      type: Boolean
    },
    animateBelow: {
      default: true,
      type: Boolean
    },
    animationDuration: {
      default: 850,
      required: false,
      type: Number
    }
  },
  data() {
    return {
      fromTop: null,
      fromBottom: null,
      toTop: null,
      toBottom: null
    }
  },
  watch: {
    isAbove (isAbove, wasAbove) {
      if (!isAbove && wasAbove && this.animateAbove && this.shouldAnimate) {
        this.fromBottom = false
        this.fromTop = true
      } else {
        this.fromTop = false
      }
    },
    isBelow(isBelow, wasBelow) {
      if (!isBelow && wasBelow && this.animateBelow && this.shouldAnimate) {
        this.fromTop = false
        this.fromBottom = true
      } else {
        this.fromBottom = false
      }
    },
    isVisible(isVisible, wasVisible) {
      if (wasVisible && this.isBelow && this.animateBelow && !this.shouldAnimate) {
        this.toTop = false
        this.toBottom = true
      } else {
        this.toBottom = false
      }

      if (wasVisible && this.isAbove && this.animateAbove && !this.shouldAnimate) {
        this.toBottom = false
        this.toTop = true
      } else {
        this.toTop = false
      }

      if (isVisible) {
        this.wasVisible = false
      }
    }
  },
  computed: {
    shouldAnimate() {
      // only animate if direction is set to animate.
      return (this.isAbove && this.animateAbove && !this.isVisible) ||
            (this.isBelow && this.animateBelow && !this.isVisible) 
            ? false : true 
    },
    visible() {
      // if we haven't initialized yet, not visible
      // if we shouldn't animate in a certain direction make sure we return true
      return this.isVisible !== null ? this.shouldAnimate ? true : false : false
    },
    viewport() {
      return {
        isVisible: this.visible,
        isAbove: this.isAbove,
        isBelow: this.isBelow,
        isPartiallyAbove: this.isPartiallyAbove,
        isPartiallyBelow: this.isPartiallyBelow,
        intersectionRatio: this.intersectionRatio,
        fromTop: this.fromTop,
        fromBottom: this.fromBottom,
        toTop: this.toTop,
        toBottom: this.toBottom,
        animateAbove: this.animateAbove,
        animateBelow: this.animateBelow,
        shouldAnimate: this.shouldAnimate
      }
    }
  }
}
</script>
<style lang="scss">
.on-visible--container {
  opacity: 0;

  &.visible {
    opacity: 1;
  }
}
</style>


