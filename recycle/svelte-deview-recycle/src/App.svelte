<script>
  import DeviewRecycle from "./DeviewRecycle.svelte";

  let items = [0, 1, 2];
  let num = 2;
  let start;
  let end;

  function onAppend() {
    console.log("OnAppend");
    items = [...items, ++num];
  }
  function itemBy(item, i) {
    return item;
  }
</script>

<style>
  :global(html),
  :global(body) {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  :global(html) {
    height: 100%;
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
    max-width: 420px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
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
  :global(.container) {
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

<header>
  <p>
    DEVIEW 2019
    <br />
    Cross Framework Component
    <br />
    Svelte Recycle Demo
  </p>
</header>
<div class="list">
  items:
  <span class="items">{items.join(', ')}</span>
  <br />
  viisble:
  <span>start: {start}, end: {end}</span>
</div>
<!-- <div class="container" use:Deviewrecycle></div> -->
<DeviewRecycle
  class="container"
  {items}
  {itemBy}
  options={{ margin: 5 }}
  let:item
  let:index
  bind:start
  bind:end
  on:append={onAppend}>
  <div class="item">item: {item}</div>
</DeviewRecycle>
