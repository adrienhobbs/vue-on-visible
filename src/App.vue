<template>
  <div id="app">
    <div class="boxes">
      <OnVisible v-for="(color, i) in colors"
                 :durationMs="parseInt(animationDurationMs)"
                 :animateAbove="animateAbove"
                 :animateBelow="animateBelow"
                 :animationType="animation"
                 :yoyo="yoyo"
                 :key="i">
        <div class="yah"
             :style="{ backgroundColor: color.bg}"></div>
      </OnVisible>
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

export default {
  name: 'app',
  data() {
    return {
      controls: false,
      animationDurationMs: 580,
      animateAbove: true,
      animateBelow: true,
      numItems: 10,
      animation: 'fade',
      yoyo: true
    }
  },
  computed: {
    colors() {
      const num = parseInt(this.numItems) || 1
      return new Array(num).fill('').map((i, idx) => {
        return {
          bg: `hsl(${(idx / num) * 360},100%,50%)`
        };
		  })
    }
  }
}

</script>

<style>
body {
  background: #403d3d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
.offset {
  width: 100%;
  height: 2px;
  left: 0;
  background: black;
  position: fixed;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
  /* grid-template-columns: repeat(2, 50px 1fr) 100px; */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 30px;
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

.yah {
  /* display: none; */
  /* opacity: 0.5; */
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
