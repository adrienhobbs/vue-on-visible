<template>
  <div class="on-visible--container slide"
       :class="className"
       :style="{animationDuration: animationDuration + 'ms'}">
    <slot />
  </div>
</template>

<script>
import AnimationMixin from '../../lib/AnimationMixin'

export default {
  name: 'slide',
  mixins: [AnimationMixin]
}
</script>

<style lang="scss">
@keyframes slideFromBottom {
  from {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideFromTop {
  from {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideToTop {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }
}

@keyframes slideToBottom {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
}

.slide {
  animation-fill-mode: both;

  &.from-bottom {
    animation-name: slideFromBottom;
    animation-duration: 0.6s;
  }

  &.from-top {
    animation-name: slideFromTop;
    animation-duration: 0.6s;
  }

  &.to-bottom {
    animation-name: slideToBottom;
    animation-duration: 0.6s;
  }

  &.to-top {
    animation-name: slideToTop;
    animation-duration: 0.6s;
  }
}
</style>


