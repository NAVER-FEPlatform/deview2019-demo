<script>
  import VanillaInfinite from "@egjs/deview-infinite";
  import { createEventDispatcher, onMount, afterUpdate } from "svelte";

  const dispatch = createEventDispatcher();
  let container;
  let infinite;
  let options;
  let attributes;

  $: {
    const props = getProps($$props);

    options = props.options;
    attributes = props.attributes;
  }


  function getProps($$props) {
    const {
      options = {},
      ...attributes
    } = $$props;

    delete attributes.$$slots;
    delete attributes.$$scope;

    return {
      options,
      attributes
    };
  }
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

<div {...attributes} bind:this={container}>
  <slot />
</div>
