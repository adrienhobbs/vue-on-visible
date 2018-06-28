// @todo directive
// refactor logic into its own module
// that can be used by a directive
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
      // observe element if yoyo toggled on from off
      if (!wasYoyo && yoyo) this.observer.observe(this.$refs.container)
    },
    isInView(isInView, wasInView) {
      var animation = false

      // stop observing element if it has entered the viewport & yoyo is false
      if (isInView && !this.yoyo) {
        this.observer.unobserve(this.$el)
      }

      // Entering Elements
      if (!wasInView && this.hasEntered) {
        if (this.enteringFromBottom()) {
          animation = { type: 'enter', location: 'from-bottom' }
        } else if (this.enteringFromTop()) {
          animation = { type: 'enter', location: 'from-top' }
        }

        // Exiting Elements
      } else if (!isInView && this.hasEntered) {
        if (this.exitingToBottom()) {
          animation = { type: 'exit', location: 'to-bottom' }
        } else if (this.exitingToTop()) {
          animation = { type: 'exit', location: 'to-top' }
        }
      } else {
        this.hasEntered = true
      }

      this.$emit('visibility-change', { visible: this.isVisible, animation })
    }
  },
  computed: {
    isVisible() {
      // if we're not animating - make sure element is visible when above or below
      if (
        (this.isAbove && !this.animateAbove) ||
        (this.isBelow && !this.animateBelow)
      ) {
        return true
      } else {
        return (
          this.bottom > this.entry.rootBounds.top - this.offset.top &&
          this.top < this.entry.rootBounds.bottom + this.offset.bottom
        )
      }
    },
    bottomThreshold() {
      return this.entry.rootBounds.bottom + this.offset.bottom
    },
    topThreshold() {
      return this.entry.rootBounds.top - this.offset.top
    },
    isAbove() {
      return this.bottom < this.topThreshold
    },
    isBelow() {
      return this.top > this.bottomThreshold
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleObserver, {
      root: null,
      threshold: this.buildThresholdList(this.accuracy)
    })
    this.observer.observe(this.$el)
  },
  methods: {
    enteringFromTop() {
      return (
        this.top < this.topThreshold &&
        this.bottom > this.topThreshold &&
        this.animateAbove
      )
    },
    enteringFromBottom() {
      return (
        this.top < this.bottomThreshold &&
        this.bottom > this.bottomThreshold &&
        this.animateBelow
      )
    },
    exitingToTop() {
      return this.bottom < this.topThreshold && this.animateAbove
    },
    exitingToBottom() {
      return this.top > this.bottomThreshold && this.animateBelow
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
        this.entry = entry

        // Check if the element is in the visible portion of the viewport
        this.isInView = this.isVisible
      })
    }
  }
}
