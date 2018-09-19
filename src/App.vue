<template>
  <div id="app">
    <div class="boxes">
      <div v-for="(color, i) in colors"
           :yoyo="yoyo"
           :key="i">
        <OnVisible :yoyo="yoyo">
          <div slot-scope="onVisible"
               class="box"
               :style="{backgroundColor: color.bg}">
            {{onVisible.viewport}}
          </div>
        </OnVisible>
      </div>
    </div>
  </div>
</template>

<script>
import OnVisible from './components/OnVisible'
import ScopeTest from './components/ScopeTest'

export default {
  name: 'app',
  components: {OnVisible, ScopeTest},
  data() {
    return {
      numItems: 40,
      yoyo: true
    }
  },
  computed: {
    colors() {
      const num = parseInt(this.numItems) || 1
      return new Array(num).fill('').map((i, idx) => {
        return {
          bg: `hsl(${(idx * 2 / num) * 360},100%,50%)`
        }
      }) 
    }
  },
  methods: {
    getRandomHeight() {
      return Math.floor(Math.random() * (500 - 150 + 1)) + 150
    }
  }
}

</script>

<style>
body {
  background-color: #262626;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin-bottom: 200px;
}

.boxes {
  display: grid;
  max-width: 768px;
  justify-self: center;
  grid-gap: 10px;
  margin: auto;
}

.box {
  height: 89vh;
  width: 100%;
}
</style>
