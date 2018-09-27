<template>
  <div v-on-visible="{onUpdate, offsets, yoyo}">
    <slot :onVisible="{isVisible, isAbove, isBelow, isPartiallyAbove, isPartiallyBelow, intersectionRatio}" />
  </div>
</template>

<script>
import OnVisibleMixin from '../lib/Mixin'
export default {
  name: 'OnVisible',
  mixins: [OnVisibleMixin]
}
</script>

