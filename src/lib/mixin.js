// @todo directive
// refactor logic into its own module
// that can be used by a directive
// use same observer?
require('./polyfills')

export default {
  name: 'OnVisibleEventEmitter',
  data() {
    return {
      entry: {},
      bottom: false,
      top: false,
      isInView: null,
      hasEntered: false
    }
  },
  props: {
    animateAbove: {
      default: false,
      type: Boolean
    },
    animateBelow: {
      default: true,
      type: Boolean
    },
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
      default: 60,
      required: false,
      type: Number
    }
  },
  watch: {
    yoyo(yoyo, wasYoyo) {
      if (!wasYoyo && yoyo) this.observer.observe(this.$refs.container)
    },
    isInView(isInView, wasInView) {
      var animation
      if (isInView && !this.yoyo) {
        this.observer.unobserve(this.$el)
      }
      // Entering Elements
      if (!wasInView) {
        if (this.enteringFromBottom()) {
          animation = 'InUp'
          this.$emit(
            'enter-from-bottom',
            this.getEmitProps({ animation, isInView })
          )
        } else if (this.enteringFromTop()) {
          animation = 'InDown'
          this.$emit(
            'enter-from-top',
            this.getEmitProps({ animation, isInView })
          )
        }
        // Exiting Elements
      } else if (!isInView) {
        if (this.exitingToBottom()) {
          animation = 'OutDown'
          this.$emit('exit-to-top', this.getEmitProps({ animation, isInView }))
        } else if (this.exitingToTop()) {
          animation = 'OutUp'
          this.$emit(
            'exit-to-bottom',
            this.getEmitProps({ animation, isInView })
          )
        }
      }

      this.$emit(
        'visibility-change',
        this.getEmitProps({ isInView, animation })
      )
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleObserver, {
      root: null,
      rootMargin: `${this.offset.top}px 0px ${this.offset.bottom}px 0px`,
      threshold: this.buildThresholdList(this.accuracy)
    })
    this.observer.observe(this.$el)
  },
  methods: {
    getEmitProps({ isInView, animation }) {
      return {
        animation,
        visible: isInView,
        isAbove:
          this.entry.boundingClientRect.bottom < this.entry.rootBounds.top,
        isBelow:
          this.entry.boundingClientRect.top > this.entry.rootBounds.bottom
      }
    },
    enteringFromTop() {
      return (
        this.top < this.entry.rootBounds.top &&
        this.bottom > this.entry.rootBounds.top &&
        this.animateAbove
      )
    },
    enteringFromBottom() {
      return (
        this.top < this.entry.rootBounds.bottom &&
        this.bottom > this.entry.rootBounds.bottom &&
        this.animateBelow
      )
    },
    exitingToTop() {
      return this.bottom < this.entry.rootBounds.top && this.animateAbove
    },
    exitingToBottom() {
      return this.top > this.entry.rootBounds.bottom && this.animateBelow
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
    handleObserver(entries) {
      entries.forEach(entry => {
        const { bottom, top } = entry.boundingClientRect
        this.top = top
        this.bottom = bottom
        this.isInView = entry.intersectionRatio > 0
        this.entry = entry
      })
      this.hasEntered = true
    }
  }
}
