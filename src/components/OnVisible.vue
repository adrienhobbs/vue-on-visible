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
import {OnVisibleEmitter} from './lib/index'

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
      isAbove: false,
      isBelow: false,
      visible: false,
      animationClass: false,
      hasFired: false
    }
  },
  computed: {
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
        above: this.isAbove && this.animateAbove,
        below: this.isBelow && this.animateBelow,
        animated: this.animationClass,
        [this.animationClass]: this.animationClass
      }
    }
  },
  methods: {
    setAnimation(animation) {
      this.animationClass = this.animationType + animation
    },
    handleVisibilityChange({visible, animation, isAbove, isBelow}) {
      this.visible = visible
      this.isAbove = isAbove
      this.isBelow = isBelow
      if (animation) this.setAnimation(animation)
    }
  }
}
</script>

<style>
@keyframes rotateXInUp {
  from {
    opacity: 0;
    transform: rotateX(90deg);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: rotateX(20deg);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
}
@keyframes zoomInUp {
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 50%, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 30%, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes zoomInDown {
  from {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5) translate3d(0, -500px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
@keyframes zoomOutDown {
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

.zoomOutDown {
  animation-name: zoomOutDown;
}

@keyframes zoomOutUp {
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

.zoomOutUp {
  animation-name: zoomOutUp;
  transform-origin: center top;
}

.zoomInDown {
  animation-name: zoomInDown;
  transform-origin: center top;
}

.zoomInUp {
  animation: zoomInUp;
}

.fadeInUp {
  animation-name: fadeInUp;
}

.fadeInDown {
  animation-name: fadeInDown;
}

.fadeOutUp {
  animation-name: fadeOutUp;
}

.fadeOutDown {
  animation-name: fadeOutDown;
}

.rotateXInUp {
  animation-name: rotateXInUp;
}

.above {
  opacity: 0;
}

.below {
  opacity: 0;
}

.animated {
  animation-duration: 0.4s;
  animation-fill-mode: both;
  transform-origin: center bottom;
}

.hidden {
  opacity: 0;
}

.on-visible__container {
  perspective: 500px;
}

.above,
.below {
  opacity: 0;
}
</style>


