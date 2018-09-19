<template>
  <div ref="container"
       class="on-visible__container"
       v-on-visible="options"
       :class="className"
       :style="{ animationDuration: durationMs + 'ms'}"
       v-on:animationend="animationClass = false">
    <slot />
  </div>
</template>

<script>
import OnVisibleEmitter from './OnVisibleEmitter'

export default {
  name: 'OnVisible',
  components: {OnVisibleEmitter},
  props: {
    durationMs: {
      type: Number,
      default: 400
    },
    animationType: {
      type: String,
      default: 'fade',
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
    offset: {
      default: 0
    },
    yoyo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      animationClass: false,
      isVisible: null,
      intersectionRatio: null,
      isAbove: null,
      isBelow: null,
      isPartiallyAbove: null,
      isPartiallyBelow: null,
      rect:  null,
      end: 0.5,
      options: {
        callback: this.updateState,
        yoyo: true,
        offsets: {top: '40%', bottom: '-10%'},
        startAt: 0.2, // start when 20% of element is visible
        endAt: 0.5 // end when 50% of element has passed 20% visible mark 
      },
    }
  },
  computed: {
    className() {
      return {
        ['on-visible__is-visible']: this.isVisible,
        [this.animationClass]: this.animationClass
      }
    }
  },
  methods: {
    setAnimation(animation) {
      this.animationClass = animation ? `${this.animationType}-${animation.location}` : ''
    },
    updateState(item) {
      this.isVisible = item.isVisible
      this.isAbove = item.isAbove
      this.isBelow = item.isBelow
      this.rect = item.rect
      // @todo force element to be 100% or 0% by specific ratio
      this.intersectionRatio = item.intersectionRatio
      this.isPartiallyAbove = item.isPartiallyAbove
      this.isPartiallyBelow = item.isPartiallyBelow

    }
  }
}
</script>
<style lang="scss">
$animations: (
  fadeFromBottom: fade-from-bottom,
  fadeFromTop: fade-from-top,
  fadeToBottom: fade-to-bottom,
  fadeToTop: fade-to-top,
  fadeIn: fade-in,
  zoomIn: zoom-in,
  zoomFromBottom: zoom-from-bottom,
  zoomFromTop: zoom-from-top,
  zoomToBottom: zoom-to-bottom,
  zoomToTop: zoom-to-top
);

@each $animation, $animationClass in $animations {
  .#{$animationClass} {
    animation-name: $animation;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, 2%, 300deg);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
  }
}

@keyframes fadeFromBottom {
  from {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeFromTop {
  from {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeToTop {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }
}

@keyframes fadeToBottom {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5) translate3d(0, 0%, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0%, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes zoomFromBottom {
  from {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5) translate3d(0, 10%, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0%, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes zoomFromTop {
  from {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5) translate3d(0, -10%, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
@keyframes zoomToBottom {
  from {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5) translate3d(0, 10%, 0);
    transform-origin: center bottom;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes zoomToTop {
  from {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5) translate3d(0, -10%, 0);
    transform-origin: center bottom;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

.on-visible__container {
  perspective: 500px;
  opacity: 0;
}

.on-visible__container.on-visible__is-visible {
  perspective: 500px;
  opacity: 1;
}
</style>


