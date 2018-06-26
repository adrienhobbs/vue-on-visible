<template>
  <OnVisibleEmitter :yoyo="yoyo"
                    :offset="offsets"
                    v-on:initial-visibility="handleVisibilityChange"
                    v-on:visibility-change="handleVisibilityChange"
                    :threshold="threshold">
    <div :class="className"
         ref="container"
         class="item"
         :style="{ animationDuration: durationMs + 'ms', height: height + 'px'}"
         v-on:animationend="animationClass = false">
      <slot />
    </div>
  </OnVisibleEmitter>
</template>

<script>
import { isAbove, isBelow, getTopOffset, getBottomOffset } from './lib/utils'
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
    },
    threshold: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      height: this.getRandomHeight(),
      top: 0,
      bottom: 0,
      visible: false,
      animationClass: false,
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
    above() {
      return isAbove({
        bottom: this.bottom,
        offset: getTopOffset({height: this.height, threshold: this.threshold, offset: this.offsets})
      })
    },
    below() {
      return isBelow({
        top: this.top,
        offset: getBottomOffset({height: this.height, threshold: this.threshold, offset: this.offsets})
      })
    },
    className() {
      return {
        above: this.above && this.animateAbove,
        below: this.below && this.animateBelow,
        animated: this.animationClass,
        [this.animationClass]: this.animationClass
      }
    }
  },
  watch: {
    above(above, wasAbove) {
      if (wasAbove && this.visible && this.animateAbove) this.setAnimation('InDown')
    },
    below(below, wasBelow) {
      if (wasBelow && this.visible && this.animateBelow) this.setAnimation('InUp')
    },
    visible(isVisible, wasVisible) {
      if (wasVisible && this.above && this.animateAbove) this.setAnimation('OutUp') 
      if (wasVisible && this.below && this.animateBelow) this.setAnimation('OutDown') 
    }
  },
  methods: {
    getRandomHeight() {
      const max = window.innerHeight
      const min = 100
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setAnimation(type) {
      this.animationClass = this.animationType + type
    },
    handleVisibilityChange({visible, top, bottom}) {
      const rect = this.$refs.container.getBoundingClientRect()
      
      this.visible = visible
      this.top = rect.top
      this.bottom = rect.bottom
    },
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
    opacity: 0.3;
    transform: translate3d(0, 160px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -60px, 0);
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
    transform: translate3d(0, -60px, 0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 60px, 0);
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
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);
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
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    transform-origin: center bottom;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

.zoomOutUp {
  animation-name: zoomOutUp;
  transform-origin: center bottom;
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
  margin: 30px;
}

.on-visible__container.visible {
  opacity: 1;
}

.above,
.below {
  opacity: 0;
}
.item {
  background-size: cover;
  display: flex;
  height: 100%;
  position: relative;
  /* margin: 30px auto 30px auto; */
  /* width: 600px; */
  /* border: 2px solid whitesmoke; */
}

.item > img {
  object-fit: cover;
  width: 100%;
}
</style>


