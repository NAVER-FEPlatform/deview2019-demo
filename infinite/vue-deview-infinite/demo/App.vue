<template>
  <div id="app">
    <deview-infinite className="container" @append="onAppend">
        <div class="item" v-for="item of items" :key="item">Item {{item}}</div>
    </deview-infinite>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DeviewInfinite } from '../src/index';

@Component({
  components: {
    DeviewInfinite,
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
