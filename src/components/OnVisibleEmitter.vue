<template>
  <div ref="container"
       style="color: white;">
    <div v-show="hasEntered">
    </div>
    <slot />
  </div>
</template>

<script>
import Mixin from '../lib/mixin'

export default {
  name: 'OnVisibleEmitter',
  mixins: [Mixin]
}
</script>

