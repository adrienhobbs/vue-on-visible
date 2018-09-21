<template>
  <div class="on-visible--container fade"
       :class="className"
       :style="{animationDuration: animationDuration + 'ms'}">
    <slot />
  </div>
</template>

<script>
import AnimationMixin from '../../lib/AnimationMixin'

export default {
  name: 'fade',
  mixins: [AnimationMixin]
}
</script>

<style lang="scss">
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

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translate3d(0, 2%, 300deg);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 0%, 0);
  }
}

.fade {
  animation-fill-mode: both;

  &.from-bottom,
  &.from-top {
    animation-name: fadeIn;
    animation-duration: 0.6s;
    animation-fill-mode: both;
    visibility: visible;
  }

  &.to-bottom,
  &.to-top {
    animation-name: fadeOut;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }
}
</style>


