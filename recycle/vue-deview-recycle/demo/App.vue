<template>
  <div id="app">
    <header>
    <p>
        DEVIEW 2019
        <br />
        Cross Framework Component
    </p>
    </header>
    <div class="list">
    items: {{items.join(", ")}}<br/>
    viisble: <span>{ start: {{start}}, end: {{end}} }</span>
    </div>
    <button class="shuffle" @click="shuffle()">
    Shuffle
    </button>
    <deview-recycle className="container" @append="onAppend" @visibleChange="onVisibleChange">
        <div class="item" v-for="item of items" :key="item">Item {{item}}</div>
    </deview-recycle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DeviewRecycle } from '../src/index';

@Component({
  components: {
    DeviewRecycle,
  },
})
export default class App extends Vue {
  items = [0, 1, 2];
  start = 0;
  end = 0;
  shuffle() {
    const items = this.items;

    items.sort(() => Math.random() - 0.5);

    this.items = [...items];
  }
  onAppend() {
    const items = this.items;
    const nextItem = (items[items.length - 1] || 0) + 1;

    this.items = [...items, nextItem];
  }
  onVisibleChange(e) {
      this.start = e.start;
      this.end = e.end;
  }
}
</script>

<style>
html, body {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
}
p,
span,
a {
  padding: 0;
  margin: 0;
}
header {
  position: relative;
  width: 100%;
  height: 300px;
  font-size: 30px;
  font-weight: bold;
  font-family: sans-serif;
  text-align: center;
  background: url(https://deview.kr/2019/img/t_main_spot.jpg) no-repeat;
  background-size: 100% auto;
  background-position: center center;
}
@media screen and (max-width: 420px) {
  header {
    background-size: auto 100%;
  }
}
header p {
  position: absolute;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.list {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  z-index: 10;
}
.container {
  position: relative;
}
.shuffle {
  width: 100%;
  height: 40px;
  font-weight: bold;
  margin: 5px 0px;
  box-shadow: none;
  border: 1px solid #ddd;
  background: #eee;
  box-sizing: border-box;
  font-size: 15px;
}
.item {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
}
</style>
