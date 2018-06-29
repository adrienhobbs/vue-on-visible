<template>
  <div v-on-visible="{callback: updateState}">
    {{isAbove}} {{isBelow}}
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      isAbove: null,
      isBelow: null,
    }
  },
  methods: {
    updateState({isAbove, isBelow}) {
      console.log(isAbove, isBelow)
      
      this.isAbove = isAbove
      this.isBelow = isBelow
    }
  }
}
</script>

