<script>
	import { onMount } from 'svelte';
	import { minidayStore, minidaySettings, minidayCharts } from './utils/store.js';
	import Minidays from './components/Minidays.svelte';
	import Controls from './components/Controls.svelte';
	
	// todo select visitor's country dynamically
	
	let maximum
	let pMmax
	$: maximum = Object.values($minidayStore).map(v => v.aMax);
	$: pMmax = Object.values($minidayStore).map(v => v.pMmax);
	
		// array of displayed countries
	$: $minidaySettings.aMax = maximum[0] != undefined ? Math.max.apply(Math, maximum) : undefined;
	$: $minidaySettings.pMax = pMmax[0] != undefined ? Math.max.apply(Math, pMmax) : undefined;
	$: $minidaySettings.navnOversatt = true;
	
	let defaults = [{label: "Norway", value: "nor"}, {label: "United Kingdom of Great Britain and Northern Ireland", value: "gbr"}, {label: "USA", value: "usa"}, {label: "Germany", value: "deu"}, {label: "France", value: "fra"}]

	onMount(()=>{
		$minidayCharts.push(...defaults);
		$minidayCharts = $minidayCharts
	})
	
</script>


<Controls>
	{#if $minidayCharts[0]}
	<section class="minidays">
			{#each $minidayCharts as country (country.value)}
				<Minidays country={country.value} />
			{/each}
	</section>
	{/if}
</Controls>


<!-- debug buttons -->
<!-- <button on:click={console.log($minidayStore)}>MinidayStore</button>
<button on:click={console.log($minidaySettings)}>minidaySettings</button>
<button on:click={console.log($minidayCharts)}>minidayCharts</button> -->


<style>

.minidays {
	display: flex;
	/* align-items: center; */
	height: 100%;
	width: 100%;
	flex-flow: row wrap;
	flex-wrap: wrap;
	justify-items: space-evenly safe;
	padding: 1rem 0;
}

</style>