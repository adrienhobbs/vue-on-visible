<template>
  <div id="app">
    <div class="boxes">
      <div v-for="(color, i) in colors"
           :key="i">
        <!-- Trigger point is 10% away from bottom and top of viewport -->
        <AnimateOnVisible :animationDuration="parseInt(animationDuration)"
                          :animateAbove="animateAbove"
                          :animateBelow="animateBelow"
                          :animationType="animation"
                          :offsets="{top: '-10%', bottom: '-10%'}"
                          :yoyo="yoyo">
          <div class="box"
               :style="{backgroundColor: color.bg}" />
        </AnimateOnVisible>
      </div>
    </div>
    <div class="controls">
      <label for="checkbox">Toggle Controls</label>
      <input type="checkbox"
             v-model="controls">
      <div class="select"
           v-if="controls">
        <div class="control">
          <label for="">Effect</label>
          <select v-model="animation">
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>
        <div class="control">
          <label for="checkbox">YoYo</label>
          <input type="checkbox"
                 v-model="yoyo">
        </div>
        <div class="control checkbox">
          <label for="checkbox">Animate Above</label>
          <input type="checkbox"
                 v-model="animateAbove">
        </div>
        <div class="control checkbox">
          <label for="checkbox">Animate Below</label>
          <input type="checkbox"
                 v-model="animateBelow">
        </div>
        <div class="control">
          <label for="">Duration in Ms</label>
          <input type="number"
                 v-model="animationDuration"
                 min="100"
                 step="50">
        </div>
        <div class="control">
          <label for="">Number of items</label>
          <input type="number"
                 v-model="numItems"
                 min="50"
                 max="500">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnVisible from './components/OnVisible'
import AnimateOnVisible from './components/AnimateOnVisible'

export default {
  name: 'app',
  components: {OnVisible, AnimateOnVisible},
  data() {
    return {
      controls: true,
      animationDuration: 650,
      animateAbove: true,
      animateBelow: true,
      numItems: 10,
      animation: 'slide',
      yoyo: true,
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
  font-size: 15px;
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

.controls {
  background: white;
  padding: 20px;
  position: fixed;
  top: 30px;
  left: 30px;
  border: 3px solid #e6e6e6;
}

.control {
  margin-top: 5px;
}

.control label {
  display: block;
}

.control.checkbox label {
  display: inline-block;
}
</style>
