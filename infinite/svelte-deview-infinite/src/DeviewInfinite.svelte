<script>
  import VanillaInfinite from "@egjs/deview-infinite";
  import { createEventDispatcher, onMount, afterUpdate } from "svelte";

  const dispatch = createEventDispatcher();
  let container;
  let infinite;

  const {
    options = {},
    class: className,
    ...attributes
  } = $$props;

  delete attributes.$$slots;
  delete attributes.$$scope;
  
  function sync() {
    infinite.sync([].slice.call(container.children));
  }
  onMount(() => {
    infinite = new VanillaInfinite(container, {
      ...options,
      renderExternal: true
    }).on("append", e => {
      dispatch("append", { ...e });
    });
    
    sync();
  });
  afterUpdate(() => {
    sync();
  });
</script>

<div class={className} {...attributes} bind:this={container}>
  <slot />
</div>
