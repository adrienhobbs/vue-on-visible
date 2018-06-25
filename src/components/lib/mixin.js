import { isAbove, isBelow } from './utils'

// @TODO THRESHOLD OR OFFSET
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
    this.observer = new IntersectionObserver(this.handleObserver, {
      root: null,
      threshold: this.buildThresholdList(this.accuracy)
    })
    this.observer.observe(this.$refs.container)
  },
  methods: {
    getOffset(loc, height) {
      // handle issue when element height is smaller than offset.
      return height < Math.abs(this.offset[loc])
        ? Math.sign(this.offset[loc]) * height
        : this.offset[loc]
    },
    buildThresholdList(numSteps) {
      var thresholds = []

      for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps
        thresholds.push(ratio)
      }

      thresholds.push(0)
      return thresholds
    },
    emitEvent(event) {
      this.$emit(event, this.viewport)
    },
    handleObserver(entries) {
      entries.forEach(entry => {
        const { top, height, bottom } = entry.boundingClientRect
        this.top = top
        this.bottom = bottom
        this.above = isAbove({ bottom, offset: this.getOffset('top', height) })
        this.below = isBelow({ top, offset: this.getOffset('bottom', height) })
        this.isInView = !this.above && !this.below

        if (!this.hasEntered) {
          this.hasEntered = true
          this.$emit('initial-visibility', {
            visible: this.isInView,
            above: this.above,
            below: this.below
          })
        }
      })
    }
  }
}
