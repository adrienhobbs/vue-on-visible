<template>
  <div v-show="rect"
       v-on-visible="{onUpdate, offsets, yoyo}">
    <slot :viewport="{isVisible, isAbove, isBelow, isPartiallyAbove, isPartiallyBelow, intersectionRatio}" />
  </div>
</template>

<script>
import OnVisibleMixin from '../lib/Mixin'
export default {
  name: 'OnVisible',
  mixins: [OnVisibleMixin]
}
</script>

