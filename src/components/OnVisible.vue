<template>
  <div v-show="rect"
       v-on-visible="{callback: updateState, offsets, yoyo}">
    <slot :viewport="{isVisible, isAbove, isBelow, isPartiallyAbove, isPartiallyBelow, intersectionRatio}" />
  </div>
</template>

<script>
export default {
  name: 'OnVisible',
  props: {
    offsets: {
      type: Object,
      default: function(){ return {top: '0%', bottom: '0%'}}, // visible when top is 10% in viewport & above when bottom 90% is out of viewport
      required: false
    },
    yoyo: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isVisible: null,
      intersectionRatio: null,
      isAbove: null,
      isBelow: null,
      isPartiallyAbove: null,
      isPartiallyBelow: null,
      rect: null,
    }
  },
  methods: {
    updateState(item) {
      // copy properties we want to component data.
      [
        'rect',
        'isAbove', 
        'isBelow', 
        'isPartiallyAbove', 
        'isPartiallyBelow', 
        'isVisible', 
        'intersectionRatio',
      ].forEach(prop => {
        this[prop] = item[prop]
      })
    }
  }
}
</script>

