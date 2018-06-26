import { isAbove, isBelow, getOffset } from './utils'

// @todo directive
// refactor logic into its own module
// that can be used by a directive
export default {
  name: 'OnVisibleEventEmitter',
  data() {
    return {
      hasEntered: false,
      // isInView: false,
      top: 0,
      height: 0,
      bottom: 0
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
    },
    rect() {
      return this.$refs.container.getBoundingClientRect()
    },
    offsetArgs() {
      return {
        height: this.height,
        offset: this.offset,
        threshold: this.threshold
      }
    },
    above() {
      return isAbove({
        bottom: this.bottom,
        offset: this.getTopOffset(this.offsetArgs)
      })
    },
    below() {
      return isBelow({
        top: this.top,
        offset: this.getBottomOffset(this.offsetArgs)
      })
    },
    isInView() {
      return !this.above && !this.below
    }
  },
  watch: {
    isInView(isInView) {
      this.$emit('visibility-change', {
        visible: isInView,
        bottom: this.bottom,
        top: this.top,
        height: this.height
      })
      if (isInView && !this.yoyo) this.observer.unobserve(this.$refs.container)
    },
    yoyo(yoyo, wasYoyo) {
      if (!wasYoyo && yoyo) this.observer.observe(this.$refs.container)
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
        this.top = top
        this.height = height
        this.bottom = bottom

        if (!this.hasEntered) {
          this.hasEntered = true
          this.$emit('initial-visibility', {
            visible: this.isInView,
            top,
            bottom,
            height
          })
        }
      })
    }
  }
}
