<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script>
import Mixin from './mixin'

export default {
  name: 'OnVisibleEmitter',
  mixins: [Mixin]
}
</script>

