<template>
  <div id="app">
    <div class="boxes">
      <div v-for="(color, i) in colors"
           :durationMs="parseInt(animationDurationMs)"
           :animateAbove="animateAbove"
           :animateBelow="animateBelow"
           :animationType="animation"
           :yoyo="yoyo"
           :offset="-200"
           :key="i">
        <Test class="box"
              :style="{ backgroundColor: color.bg}"></Test>
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
                 v-model="animationDurationMs"
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
// @todo using intersection ration make an animation ease
import Test from './components/Test'

export default {
  name: 'app',
  components: {Test},
  data() {
    return {
      controls: false,
      animationDurationMs: 650,
      animateAbove: true,
      animateBelow: true,
      numItems: 10,
      animation: 'fade',
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
    testCb({isAbove, isBelow}) {
      console.log(isAbove, isBelow)
    },
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
}

.controls {
  background: white;
  padding: 10px;
  position: fixed;
  top: 30px;
  left: 30px;
  border: 3px solid #e6e6e6;
}

.boxes {
  display: grid;
  max-width: 768px;
  justify-self: center;
  grid-gap: 10px;
  margin: auto;
}
.control {
  margin-top: 15px;
}
.control label {
  display: block;
}
.control.checkbox label {
  display: inline-block;
}
.box {
  height: 34vh;
  width: 100%;
}
</style>
