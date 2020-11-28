<script>
  import { getContext } from 'svelte';
  import { norskTall } from '../../utils/functions.js';
  import QuadTree from './QuadTree.percent-range.svelte';
  const { data, width, height, yScale, config } = getContext('LayerCake');

  export let dataset;

</script>

<QuadTree
  dataset={dataset || $data}
  
  let:x
  let:y
  let:visible
  let:found
  let:e
>
  {#if visible === true}
    <div
      style="
      display: block;
      top: {($yScale(found[$config.y]) / 100 ) * $height - 5 }px;
      left: {(x / 100) * $width -5 }px;"
      class="dot"></div>
    <div class="ttp">{norskTall(found[$config.y])}</div>
  {/if}
</QuadTree>

<style>
  .ttp {
    font-size: .7rem;
  }

  .dot {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    background: black;
    border-radius: 10px;
    /* pointer-events: none; */
  }

</style>