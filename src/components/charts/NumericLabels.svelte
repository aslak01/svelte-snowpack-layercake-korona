<script>
  import { getContext } from 'svelte';

  const { data, width, yScale, config } = getContext('LayerCake');
  
  // console.log($data)
  
  
  /* --------------------------------------------
	 * Put the label on the highest value
	 */
  // $: left = values => $xScale(max(values, $x)) /  Math.max(...$xRange);
  // $: top = values => $yScale(max(values, $y)) / Math.max(...$yRange);
</script>

<!-- 
	<div
    class="label"
    style="
      top:{top($data.values) * 100}%;
      left:{left($data.values) * 100}%;
    "
  >{left}</div> -->


<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%)translateY(1px);
		font-size: 13px;
	}
</style>
