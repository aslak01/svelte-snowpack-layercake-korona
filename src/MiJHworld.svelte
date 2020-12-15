<script>
	import { onMount } from 'svelte';
	import { minidaySettings } from './utils/store.js';
	import { uniques } from 'layercake';	
	import { computeMovingAverage, cutData, insidens } from './utils/functions.js'
	import MiniLine from './components/charts/MiniLineCh.svelte'
	
	
	export let data
	export let worldPop
	console.log(data.cases)
	let cases = [] 
	Object.entries(data.cases)
		.forEach(([key, value]) => {
			// console.log(key, value, index)
		cases.push({
			date: key,
			cases: value
		})
	});
	console.log(cases)
	
	$: range = $minidaySettings.range;
	$: start = $minidaySettings.cut.start;
	$: end = $minidaySettings.cut.end;
	let highlightColor = $minidaySettings.color;
	$: skala = $minidaySettings.skala;

	// let index;

	let max
	let shavedData
	let currAvgIndex
	let MovingAverage;

	let avgKey = 'new'
	let yKey = 'avg'
	let xKey = 'date'
	let pMilKey = 'pmil'

	const strokeWidth = 1
	const stroke = highlightColor;
			
	// $: MovingAverage = computeMovingAverage(data.data.new, range, xKey, avgKey, yKey);
	// $: shavedData = cutData(MovingAverage, start, end)
	// $: currAvgIndex = shavedData.map(d => d[yKey] !== undefined).lastIndexOf(true)
	// $: currAvg = currAvgIndex > 0 ? shavedData[currAvgIndex][yKey] : false
	// $: currInsidens = insidens(currAvg, population)
	// $: max = Math.max.apply(Math, shavedData.map(d => d[yKey]))
	// $: updShv = shavedData.map(v => ({
	// 	...v, pmil: parseInt(insidens(v[yKey], population))
	// 	}))
	// $: mvUniqueDates = uniques(shavedData, xKey)
	
	
	
	
	

		

</script>

<!-- <article class="enhet">
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
					ttData={updShv}
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
						ttData={updShv}
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

</article> --> 

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
