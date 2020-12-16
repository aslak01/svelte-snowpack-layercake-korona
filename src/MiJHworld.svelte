<script>
	import { onMount } from 'svelte';
	import { minidaySettings } from './utils/store.js';
	import { uniques } from 'layercake';	
	import { computeMovingAverage, cutData, insidens } from './utils/functions.js'
	import MiniLine from './components/charts/MiniLineCh.svelte'
	
	
	export let data
	export let worldPop
	// console.log(data.cases)
	let cases = []
	let values = []
	
	function prepData () {
		Object.entries(data.cases)
			.forEach(([key, value]) => {
				cases.push({
					date: new Date(key),
					total: value
				});
		});
		Object.values(data.cases)
			.forEach(v => {
				values.push(v)
			})
	}
	prepData();

	function addNews() {
		cases = cases.flatMap((v, i) => ({
				...v,
				new: values[i-1] ? v.total - values[i-1] : v.total
			})
		)
	}
	addNews();
	// console.log(cases)
	
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
			
	$: MovingAverage = computeMovingAverage(cases, range, xKey, avgKey, yKey);
	$: shavedData = cutData(MovingAverage, start, end)
	$: currAvgIndex = shavedData.map(d => d[yKey] !== undefined).lastIndexOf(true)
	$: currAvg = currAvgIndex > 0 ? shavedData[currAvgIndex][yKey] : false
	$: currInsidens = currAvgIndex > 0 ? updShv[currAvgIndex][pMilKey] : false
	
	$: updShv = shavedData.map(v => ({
		...v, pmil: parseInt(insidens(v[yKey], worldPop))
		}))

	
	//max avg
	$: max = Math.max.apply(Math, shavedData.map(d => d[yKey]))
	$: maxPm = Math.max.apply(Math, updShv.map(d => d[pMilKey]))
	
	$: mvUniqueDates = uniques(shavedData, xKey)
	
	// $: console.log(MovingAverage, shavedData)
	
	
	

		

</script>
<div class="chartdescription">
{#if skala === 3}Daily new cases per 100 000 globally:
{:else}Daily new cases reported globally:{/if}
</div>

<article class="enhet">
	<div class="chart">
		<div class="chart-container">
			{#if skala != 3}
				<MiniLine
					data={shavedData}
					{xKey} {yKey}
					xDomain={mvUniqueDates}
					yMax={max}
					{stroke} {strokeWidth}
					labels={currAvg}
					ttData={shavedData}
				/>
				{:else}
					<MiniLine
						data={updShv}
						{xKey} 
						yKey={pMilKey}
						xDomain={mvUniqueDates}
						yMax={maxPm}
						{stroke} {strokeWidth}
						labels={currInsidens}
						ttData={updShv}
					/>
			{/if}
		</div>
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
	.chartdescription {
		margin-bottom: 1rem;
	}
</style>
