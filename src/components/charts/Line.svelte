<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let stroke = '#ab00d6';
	export let strokeWidth = 2

  $: path = 'M' + $data.filter(d => $yGet(d) !== undefined && $xGet(d) !== undefined)
		.map(d => {
			return $xGet(d) + ',' + $yGet(d);
		})
		.join('L');

</script>

<path class='path-line' d='{path}' {stroke} stroke-width={strokeWidth}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>


