<script>
  import { getContext } from 'svelte';
  import { max } from 'd3-array';
  
  export let labelValue = undefined
  $: label = new Intl.NumberFormat("no-NO").format(labelValue)
  
  function convert(n) {
    var order = Math.floor(Math.log(n) / Math.LN10
                       + 0.000000001); // because float math sucks like that
    // return Math.pow(10,order);
    return order
  }
  
  $: offset = labelValue < 1 ? .01 : convert(labelValue)

  const { data, x, y, xScale, yScale, xRange, yRange, xGet, yGet } = getContext('LayerCake');
  /* --------------------------------------------
	 * Title case the first letter
	 */
	// const cap = val => val.replace(/^\w/, d => d.toUpperCase());

  $: left = $xGet($data[$data.length-1]) / 100
  $: top = $yGet($data[$data.length-1]) / 100

</script>


	<div
    class="label"
    style="
      top:{top * 100 + 8 }%;
      left:{left * 100 + 12 + (8 * offset)}%;
    "
  >{label}</div>


<style>
	.label {
    text-align: left;
		position: absolute;
		transform: translate(-100%, -100%)translateY(1px);
		font-size: 10px;
	}
</style>
