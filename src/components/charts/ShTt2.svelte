<script>
  import { getContext } from 'svelte';
  import { norskTall, norskDato } from '../../utils/functions.js';
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
      top: {($yScale(found[$config.y]) / 100 ) * $height }px;
      left: {(x / 100) * $width }px;"
      class="dot"></div>
    <div class="ttp">{norskDato(found[$config.x])}:<br/><strong>{norskTall(found[$config.y])}<strong></div>
    
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
    /* width: 8px;
    height: 8px; */
    /* background: #222; */
    /* border: 1px solid black; */
    /* border-radius: 10px; */
    /* pointer-events: none; */
  }
  .dot::after {
    content: '';
    position: absolute;
    top:-6px;
    left: -6px;
    display: inline-block;
    border: 2px solid RoyalBlue;
    width: 8px;
    height: 8px;
    border-radius: 8px;
  }

</style>