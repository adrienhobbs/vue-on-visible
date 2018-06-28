<template>
  <div ref="container"
       style="color: white;">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import Mixin from '../lib/mixin'

export default {
  name: 'OnVisibleEmitter',
  mixins: [Mixin]
}
</script>

