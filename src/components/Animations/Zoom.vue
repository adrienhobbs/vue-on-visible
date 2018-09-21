<template>
  <div class="on-visible--container zoom"
       :class="className"
       :style="{animationDuration: animationDuration + 'ms'}">
    <slot />
  </div>
</template>

<script>
import AnimationMixin from '../../lib/AnimationMixin'

export default {
  name: 'zoom',
  mixins: [AnimationMixin]
}
</script>

<style lang="scss">
@keyframes zoomFromBottom {
  from {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8) translate3d(0, 10%, 0);
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
    transform: scale3d(0.8, 0.8, 0.8) translate3d(0, -10%, 0);
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
    transform: scale3d(0.8, 0.8, 0.8) translate3d(0, 10%, 0);
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

.zoom {
  animation-fill-mode: both;

  &.from-bottom {
    animation-name: zoomFromBottom;
    animation-duration: 0.6s;
    opacity: 1;
    visibility: visible;
  }

  &.from-top {
    animation-name: zoomFromTop;
    animation-duration: 0.6s;
    opacity: 1;
    visibility: visible;
  }

  &.to-bottom {
    animation-name: zoomToBottom;
    animation-duration: 0.6s;
    opacity: 1;
    visibility: visible;
  }

  &.to-top {
    animation-name: zoomToTop;
    animation-duration: 0.6s;
    opacity: 0;
  }
}
</style>


