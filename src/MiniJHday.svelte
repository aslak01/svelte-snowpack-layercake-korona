<script>
	// MINIDAYS
	import { onMount, onDestroy } from 'svelte';
	import { minidayStore, minidaySettings, minidayCharts } from './utils/store.js';
	import { uniques } from 'layercake';
	
	// import norsk from './data/countries/countries_no.json'
	import engelsk from './data/countries/countries_en.json'
	
	import { computeMovingAverage, cutData, insidens } from './utils/functions.js'
	
	import MiniLine from './components/charts/MiniLineCh.svelte'
	
	
	export let data
	export let cData
	export let country
	$: range = $minidaySettings.range;
	$: start = $minidaySettings.cut.start;
	$: end = $minidaySettings.cut.end;
	let highlightColor = $minidaySettings.color;
	$: skala = $minidaySettings.skala;

	// let index;

	let shavedData
	let currAvgIndex
	let MovingAverage;

	let avgKey = 'new'
	let yKey = 'avg'
	let xKey = 'date'
	let pMilKey = 'pmil'

	const strokeWidth = 1
	const stroke = highlightColor;
	
	// const oversettelse = norsk.filter(i => i.alpha3 === country)
	const oversettelse_en = engelsk.filter(i => i.alpha3 === country)
	
	let oldpMmax = null
	let oldmax = null
	let oldcurrInsidens = null
	let oldcurrAvg = null
	
	let pMmax = null
	let max = null
	let currInsidens = null
	let currAvg = null
	
	
	let population
	$: population = cData.population
	
	$: MovingAverage = computeMovingAverage(data.data.new, range, xKey, avgKey, yKey);
	$: shavedData = cutData(MovingAverage, start, end)
	$: currAvgIndex = shavedData.map(d => d[yKey] !== undefined).lastIndexOf(true)
	
	$: currAvg = currAvgIndex > 0 ? shavedData[currAvgIndex][yKey] : false
	$: currInsidens = parseInt(insidens(currAvg, population))
	$: max = Math.max.apply(Math, shavedData.map(d => d[yKey]))
	$: pMmax = Math.max.apply(Math, shavedData.map(d => insidens(d[yKey], population)))
	
	$: updShv = shavedData.map(v => ({
		...v, pmil: parseInt(insidens(v[yKey], population))
		}))
	$: if (oldpMmax != pMmax && oldmax != max && oldcurrInsidens != currInsidens && oldcurrAvg != currAvg) {
		oldpMmax = pMmax
		oldmax = max
		oldcurrInsidens = currInsidens
		oldcurrAvg = currAvg
		$minidayCharts
		.filter(v => v.value === country).map(i => {
			 i.pMmax = pMmax, 
			 i.max = max,	 
			 i.pMnow = currInsidens,
			 i.now = currAvg
		})
		$minidayCharts = $minidayCharts
	}
// add values to sort by
 // $minidayCharts
	// .filter(v => v.value === country).map(i => {
	// 	 i.pMmax = pMmax, 
	// 	 i.max = max,	 
	// 	 i.pMnow = currInsidens,
	// 	 i.now = currAvg
	// })
	// $minidayCharts = $minidayCharts

	$: mvUniqueDates = uniques(shavedData, xKey)

	
	let recentData
	$: recentData = { id: country, aMax: max, pMmax }
	

	$: $minidayStore[country] = recentData
	$: $minidaySettings.max = []
	$: $minidaySettings.max.push(max)
	
	let destroy = () => {
		console.log('Fjerna ', country)
		$minidayCharts = $minidayCharts.filter(function(value){
			if (value.value != country) return value
		})	
	}
	onDestroy( () => {
		console.log('Fjerna ', country)
		delete $minidayStore[country]
		$minidayStore = $minidayStore
		// $minidayStore = $minidayStore.filter((n) => {return n.id != country})
	})
	
</script>

<article class="enhet">
	<button class="del" on:click={destroy}>&#10005;</button>

	<div class="chart">
		<div class="chart-container">
			{#if skala == 1}
				<MiniLine
					data={shavedData}
					{xKey} {yKey}
					xDomain={mvUniqueDates}
					yMax={max}
					{stroke} {strokeWidth}
					labels={currAvg}
					ttData={shavedData}
				/>
				{:else if skala == 2}
				{#await $minidaySettings.aMax}...{:then absMax}
					<MiniLine
						data={shavedData}
						{xKey} {yKey}
						xDomain={mvUniqueDates}
						yMax={absMax}
						{stroke} {strokeWidth}
						labels={currAvg}
						ttData={shavedData}
					/>
				{/await}
				{:else}
				{#await updShv}...{:then updShv}
				{#await $minidaySettings.pMax}...{:then MdPmax}
					<MiniLine
						data={updShv}
						{xKey} 
						yKey={pMilKey}
						xDomain={mvUniqueDates}
						yMax={MdPmax}
						{stroke} {strokeWidth}
						labels={currInsidens}
						ttData={updShv}
					/>
				{/await}
				{/await}
			{/if}
		</div>
	</div>
	<div class="text">
		{#if $minidaySettings.navnOversatt}
			<h3 class="name">{oversettelse_en[0].name}</h3>
		{:else}
			<h3 class="name">{cData.nativeName}</h3>
		{/if}
		<!-- <span class="insidens">{currInsidens}</span> -->
	</div>
</article>

<style>
	.enhet {
		position: relative;
		width: 120px;
		height: 100px;
		/* margin-right: auto; */
		justify-content: center;
	}
	.chart {
		position: relative;
		width: 90px;
		height: 60px;
		padding-top: 0;
		z-index: 10;
		margin-left: 5px;
	}
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.text {
		height: 30px;
		position: relative;
		width: 100%;
	}
	.name {
		position: absolute;
		top: 5px;
		left: 5px;
		display: block;
		font-weight: normal;
		font-size: .8rem;
		margin: 0;
		max-width: 110px;
		/* margin-left: 5px; */

		/* white-space: nowrap; */
	}
	.insidens {
		font-size: .7rem;
		position: absolute;
		top: .8rem;
		right: 0;
	}
	
	.del {
		position: absolute;
		left: -15px;
		bottom: 19px;
		font-size: 1rem;
		background: transparent;
		border: 0;
		padding: .2rem;
		padding-right: .15rem;
		padding-bottom: .25rem;
		border-radius: 3px;
		text-align: center;
		line-height: .6rem;
		color: #999;
	}
	.del:hover {
		background: tomato;
		color: white;
	}
</style>
