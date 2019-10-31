<script>
  import VanillaRecycle from "@egjs/deview-recycle";
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    tick,
  } from "svelte";

  export let items = [];
  export let start = -1;
  export let end = -1;
  export let container;
  const dispatch = createEventDispatcher();
  let visibleItems = items;
  let recycle;

  const {
    class: className = "",
    itemBy,
    options = {},
    $$slots: slots,
    $$scope: scope,
    ...attributes
  } = $$props;

  delete attributes.items;

  $: syncItems(items);

  function syncItems(items) {
    if (recycle) {
      recycle.beforeSync(items.map(itemBy));
      const indexes = recycle.getRenderingIndexes();

      start = indexes.start;
      end = indexes.end;

      visibleItems = items.slice(start, end + 1);
    } else {
      visibleItems = items;
    }

    tick().then(() => {
      // afterUpdate
      recycle.sync(getChildren());
    });
  }

  function getChildren() {
    return [].slice.call(container.children);
  }
  const callbacks = {};

  onMount(ctx => {
    recycle = new VanillaRecycle(container, {
      ...options,
      renderExternal: true
    })
      .on("append", e => {
        dispatch("append", { ...e });
      })
      .on("visibleChange", e => {
        syncItems(items);
      });

    recycle.beforeSync(items.map(itemBy));
    recycle.sync(getChildren());
  });
  onDestroy(() => {
    recycle.destroy();
  });
</script>

<div class={className} {...attributes} bind:this={container}>
  {#each visibleItems as item, index (itemBy(item, start + index, items)) }
  <slot items={visibleItems} item={item} index={start + index} />
  {/each}
</div>
