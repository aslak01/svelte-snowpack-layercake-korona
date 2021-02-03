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
	// $: console.log($minidayStore)
		// array of displayed countries
	$: $minidaySettings.aMax = maximum[0] != undefined ? Math.max.apply(Math, maximum) : undefined;
	
	$: $minidaySettings.pMax = pMmax[0] != undefined ? Math.max.apply(Math, pMmax) : undefined;
	
	$: $minidaySettings.navnOversatt = true;
	// $: console.log($minidaySettings)
	
	let defaults = [
		{value: "bel"}, 
		{value: "cze"}, 
		{value: "fra"}, 
		{value: "nld"},
		{value: "dnk"}, 
		{value: "gbr"}, 
		{value: "deu"}, 
		{value: "nor"}, 
		{value: "usa"}, 
		{value: "mex"}, 
		{value: "tur"}, 
		{value: "geo"}, 
	]

	onMount(()=>{
		if ($minidayCharts.length < 1) { 
			$minidayCharts.push(...defaults);
		}
	})
	
	// $: console.log($minidaySettings)
	
	$: sortKey = $minidaySettings.sort
	let sortedChartsOld = $minidayCharts?.sort((a, b) => b[sortKey] - a[sortKey]);
	$: sortedCharts = $minidayCharts.sort((a, b) => b[sortKey] - a[sortKey]);
	
	$: if (sortedCharts != sortedChartsOld) {
		$minidayCharts = $minidayCharts
		sortedCharts = $minidayCharts.sort((a, b) => b[sortKey] - a[sortKey]);
		sortedChartsOld = sortedCharts
	}
	
</script>


<Controls>
	{#if sortedCharts[0]}
	<h1 class="septheheading">Average positive Covid tests {#if $minidaySettings.skala === 3}per 100k{/if} the past {$minidaySettings.range} days</h1>
	<ol class="minidays">
			{#each sortedCharts as country (country.value)}
				<Minidays country={country.value} />
			{/each}
	</ol>
	{/if}
</Controls>


<!-- debug buttons -->
<!-- <button on:click={console.log($minidayStore)}>MinidayStore</button>
<button on:click={console.log($minidaySettings)}>minidaySettings</button>
<button on:click={console.log($minidayCharts)}>minidayCharts</button>
<button on:click={$minidayCharts = $minidayCharts}>minidayCharts = minidayCharts</button> -->

<style> 
.septheheading {
	margin-top: 4rem;
	margin-left: -20px;
	font-weight: 400;
}
.minidays {
	display: flex;
	/* align-items: center; */
	height: 100%;
	width: 100%;
	flex-flow: row wrap;
	flex-wrap: wrap;
	justify-items: space-evenly safe;
	padding: 1rem 0;
	margin: 1rem auto;
}

</style>