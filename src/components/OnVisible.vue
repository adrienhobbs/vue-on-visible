<template>
  <div v-show="rect"
       v-on-visible="{onUpdate, offsets, yoyo}">
    <slot :isVisible={isVisible}
          :isAbove={isAbove}
          :isBelow={isBelow}
          :isPartiallyAbove={isPartiallyAbove}
          :isPartiallyBelow={isPartiallyBelow}
          :intersectionRation={intersectionRatio}
          :rect={rect} />
  </div>
</template>

<script>
import OnVisibleMixin from '../lib/Mixin'
export default {
  name: 'OnVisible',
  mixins: [OnVisibleMixin]
}
</script>

