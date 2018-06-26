import { isAbove, isBelow, getOffset } from './utils'

// @todo directive
// refactor logic into its own module
// that can be used by a directive
export default {
  name: 'OnVisibleEventEmitter',
  data() {
    return {
      hasEntered: false,
      above: false,
      below: false,
      top: 0,
      bottom: 0,
      isInView: false
    }
  },
  props: {
    offset: {
      default: 0,
      required: false
    },
    yoyo: {
      default: false,
      required: false,
      type: Boolean
    },
    accuracy: {
      default: 20,
      required: false,
      type: Number
    },
    threshold: {
      default: 0
    }
  },
  computed: {
    viewport() {
      return {
        isInView: this.isInView,
        above: this.above,
        below: this.below
      }
    }
  },
  watch: {
    isInView(isInView, wasInView) {
      if (wasInView && this.below) this.emitEvent('exit:to-bottom')
      if (isInView && !this.yoyo) this.observer.unobserve(this.$refs.container)
    },
    yoyo(yoyo, wasYoyo) {
      if (!wasYoyo && yoyo) this.observer.observe(this.$refs.container)
    },
    above(above, wasAbove) {
      if (wasAbove && this.isInView) this.emitEvent('enter:from-top')
      else if (above && !this.isInView) this.emitEvent('exit:to-top')
    },
    below(below, wasBelow) {
      if (wasBelow && this.isInView) this.emitEvent('enter:from-bottom')
    }
  },
  mounted() {
    const threshold = this.buildThresholdList(this.accuracy)
    this.observer = new IntersectionObserver(this.handleObserver, {
      root: null,
      threshold
    })
    this.observer.observe(this.$refs.container)
  },
  methods: {
    getTopOffset: getOffset('top'),
    getBottomOffset: getOffset('bottom'),
    updateVp({ top, bottom, height }) {
      const offsetArgs = {
        height,
        offset: this.offset,
        threshold: this.threshold
      }
      this.above = isAbove({
        bottom,
        offset: this.getTopOffset(offsetArgs)
      })
      this.below = isBelow({
        top,
        offset: this.getBottomOffset(offsetArgs)
      })

      this.isInView = !this.above && !this.below
    },
    buildThresholdList(numSteps) {
      var thresholds = []

      for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps
        thresholds.push(ratio)
      }

      thresholds.push(0, this.threshold)

      return thresholds
    },
    emitEvent(event) {
      this.$emit(event, this.viewport)
    },
    handleObserver(entries) {
      entries.forEach(entry => {
        const { top, height, bottom } = entry.boundingClientRect
        this.updateVp({ top, bottom, height })

        if (!this.hasEntered) {
          this.hasEntered = true
          this.$emit('initial-visibility', {
            above: this.above,
            below: this.below
          })
        }
      })
    }
  }
}
