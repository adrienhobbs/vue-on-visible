<template>
  <div id="app">
    <div class="boxes">
      <OnVisible v-for="(color, i) in colors"
                 :durationMs="parseInt(animationDurationMs)"
                 :animateAbove="animateAbove"
                 :animateBelow="animateBelow"
                 :animationType="animation"
                 :offset="{top: -150, bottom: -155}"
                 :yoyo="yoyo"
                 :key="i">
        <div class="yah"
             :style="{ backgroundColor: color.bg}"></div>
      </OnVisible>
    </div>
    <div class="controls"
         v-if="controls">
      <div class="select">
        <label for="">Effect</label>
        <br>
        <select v-model="animation">
          <option value="fade">Fade</option>
          <option value="zoom">Zoom</option>
        </select>
        <br>
        <label for="checkbox">YoYo</label>
        <input type="checkbox"
               v-model="yoyo">
        <br>
        <label for="checkbox">Animate Above</label>
        <input type="checkbox"
               v-model="animateAbove">
        <br>
        <label for="checkbox">Animate Below</label>
        <input type="checkbox"
               v-model="animateBelow">
        <br />
        <label for="">Duration in Ms</label>
        <br>
        <input type="number"
               v-model="animationDurationMs"
               min="100"
               step="50">
        <br>
        <br />
        <label for="">Number of items</label>
        <br>
        <input type="number"
               v-model="numItems"
               min="50">

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
      controls: true,
      animationDurationMs: 580,
      animateAbove: true,
      animateBelow: true,
      numItems: 100,
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
}
.offset {
  width: 100%;
  height: 2px;
  left: 0;
  background: black;
  position: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.controls {
  width: 180px;
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
.yah {
  display: none;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
