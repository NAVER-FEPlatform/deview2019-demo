<template>
  <div id="app">
    <deview-recycle className="container" @append="onAppend">
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
  onAppend() {
    const items = this.items;
    const nextItem = (items[items.length - 1] || 0) + 1;

    this.items = [...items, nextItem];
  }
}
</script>

<style>
  .item {
    padding: 10px;
    border: 1px solid black;
    width: 100%;
  }
</style>
