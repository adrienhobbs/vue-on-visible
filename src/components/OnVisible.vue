<template>
  <OnVisibleEmitter :yoyo="yoyo"
                    :offset="offsets"
                    :animateAbove="animateAbove"
                    :animateBelow="animateBelow"
                    v-on:visibility-change="handleVisibilityChange">
    <div ref="container"
         class="on-visible__container"
         :class="className"
         :style="{ animationDuration: durationMs + 'ms'}"
         v-on:animationend="animationClass = false">
      <slot />
    </div>
  </OnVisibleEmitter>
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
      animationClass: false
    }
  },
  computed: {
    // creates default offset object
    // allows user to pass in single number for both offsets
    // or top & bottom offsets respectively
    offsets() {
      const defaultOffset = {top: 0, bottom: 0}
      if (typeof this.offset === 'object') {
        return {...defaultOffset, ...this.offset}
      } else if (typeof this.offset === 'number') {
        return {top: this.offset, bottom: this.offset}
      }
    },
    className() {
      return {
        ['on-visible__is-visible']: this.visible,
        [this.animationClass]: this.animationClass
      }
    }
  },
  methods: {
    setAnimation(animation) {
      this.animationClass = animation ? `${this.animationType}-${animation.location}` : ''
    },
    handleVisibilityChange({visible, animation}) {
      this.visible = visible
      this.setAnimation(animation)
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
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 0%, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 0%, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes zoomFromBottom {
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 10%, 0);
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
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 10%, 0);
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
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -10%, 0);
    transform-origin: center bottom;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

.on-visible__container {
  perspective: 500px;
  opacity: 0;
  transition: opacity 0.65s ease-out;
}

.on-visible__container.on-visible__is-visible {
  perspective: 500px;
  opacity: 1;
}
</style>


