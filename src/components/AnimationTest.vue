<template>
  <div v-show="rect"
       v-on-visible="options"
       :style="{ transform: `translateY(${currentY}px)`}">
    <slot />
  </div>
</template>

<script>
import Ease from '../lib/ease'

export default {
  name: 'Test',
  data() {
    return {
      options: {
        callback: this.updateState,
        yoyo: true,
        offsets: {top: '40%', bottom: '-10%'},
        startAt: 0.2, // start when 20% of element is visible
        endAt: 0.5 // end when 50% of element has passed 20% visible mark 
      },
      fromY: 60,
      currentY: 60,
      duration: 500,
      isVisible: null,
      intersectionRatio: null,
      isAbove: null,
      isBelow: null,
      isPartiallyAbove: null,
      isPartiallyBelow: null,
      rect:  null,
      end: 0.5,
      time: {}
    }
  },
  computed: {
    opacity() {
      return (this.isPartiallyAbove) ? 1 : Ease.inOutCubic(this.ratio)
    },
    y() {
      return Ease.inOutQuad(1 - this.ratio) * 100
    },
    ratio() {
      return ((this.intersectionRatio > this.options.endAt) ? this.options.endAt : this.intersectionRatio) / (this.options.endAt || 1)
    },
    top() {
      return this.rect.top
    },
    bottom() {
      return this.rect.bottom
    } 
  },
  watch: {
    isVisible(isVisible, wasVisible) {
      if (isVisible && !wasVisible) {
      this.time = {
        start: performance.now(),
        total: this.duration
      }
      requestAnimationFrame(this.tick);
      }
    }
  },
  methods: {
    getProgress({elapsed, total}) {
     return Math.min(elapsed / total, 1)
    },
    tick(now) {
      this.time.elapsed = now - this.time.start;
      const progress = this.getProgress(this.time);
      const easing = Ease.inOutQuad(progress);
      const position = easing * this.fromY;
      // element.style.transform = `translate(${position}px)`;
      this.currentY = this.fromY - position
      if (progress < 1) requestAnimationFrame(this.tick.bind(this));
    },
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
      // @todo force element to be 100% or 0% by specific ratio
      this.intersectionRatio = intersectionRatio
      this.isPartiallyAbove = isPartiallyAbove
      this.isPartiallyBelow = isPartiallyBelow

    }
  }
}
</script>

