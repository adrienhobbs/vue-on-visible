<template>
  <div style="position: relative; width: 100%; height: 100%">
    <div style="top: 10px; position: absolute;">
      {{viewport}}
    </div>
    <div style="bottom: 10px; position: absolute;">
      {{viewport}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScopeTest',
  props: ['viewport'],
}
</script>

