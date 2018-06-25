require('./polyfills')
export { default } from './plugin'
export { default as OnVisibleMixin } from './mixin'
export { default as OnVisibleEmitter } from './OnVisibleEmitter'

// entries.forEach(entry => {
//   const { top, height, bottom } = entry.boundingClientRect
//   // entering viewport has passed threshold
//   if (entry.intersectionRatio >= this.threshold && this.hasEntered) {
//     if (top < 0 && !this.inView) {
//       this.$emit('enter:from-top')
//     } else if (top > 0 && !this.inView) {
//       this.$emit('enter:from-bottom')
//     }
//     this.inView = true
//   } else if (entry.intersectionRatio < this.threshold && this.hasEntered) {
//     // leaving viewport
//     if (top < 0 && this.inView) {
//       this.$emit('leave:to-top')
//     } else if (top > 0 && this.inView) {
//       this.$emit('leave:to-bottom')
//     }
//     this.inView = false
//   } else if (!this.hasEntered) {
//     this.hasEntered = true
//     if (entry.intersectionRatio >= this.threshold) {
//       this.inView = true
//     } else {
//       this.inView = false
//     }
//     const thresholdPoint = getViewportHeight() - height * this.threshold
//     this.$emit('initial-visibility', {
//       visible: this.inView,
//       above: bottom < 0,
//       below: top > thresholdPoint
//     })
//   }
// })
