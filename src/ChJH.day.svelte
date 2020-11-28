<script>
	import { uniques } from 'layercake';
	import LineBarDay from './components/LineBarDay.svelte'
	import MiniJHday from './MiniJHday.svelte';
	import LineBrush from './components/LineBrush.svelte'
	import Gjennomsnitter from './components/Gjennomsnitter.svelte'

	import { computeMovingAverage, cutData } from './utils/functions.js'

	export let mainSelection;
	export let highlightColor;	
	
	
	const textHighlightColor = "#ffa600";
	let charts = 3;
	let options = { day: 'numeric', month: 'numeric', year: '2-digit' }

	export let data
	
	
	let range = 7;
	let MovingAverage;
	$: MovingAverage = computeMovingAverage(data.data.new, range, 'date', 'new', 'avg');
	// $: console.log(MovingAverage)
	
	// merge avgs back into data
	// https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key-
	const mergeByDate = (a1, a2) =>
	a1.map(itm => ({
			...a2.find((item) => (item.date === itm.date) && item),
			...itm
	}));

	$: dataToShave = mergeByDate(data.data.new, MovingAverage)
		
	
	let starter = ((data.data.new.findIndex(n => n.new >0))/data.data.new.length) // dynamic right before epidemic start
	let start = starter;
	let end = 1;
	
	let shavedData
	$: shavedData = cutData(dataToShave, start, end)
	$: shavedMvAvg = cutData(MovingAverage, start, end)
		
	$: firstRepShort = shavedData[0].date.toLocaleDateString('no-NO', options)
	$: lastRepShort = shavedData[shavedData.length-1].date.toLocaleDateString('no-NO', options)

	
	$: mvUniqueDates = uniques(shavedData, "date")
	$: lineUniqueDates = uniques(shavedMvAvg, "date")
	$: max = Math.max.apply(Math, shavedData.map(function(o) { return o.new; }))
	
	// https://stackoverflow.com/questions/33268863/find-last-matching-object-in-array-of-objects/49199917#49199917
	let currAvgIndex
	$: currAvgIndex = shavedData.map(d => d.avg !== undefined).lastIndexOf(true)
	
	$: currAvg = currAvgIndex > 0 ? shavedData[currAvgIndex].avg : false


	let modeSelect = [
		{ label: "Begge", value: 3 },
		{ label: "Dager", value: 2 },
		{ label: "Glidende gjennomsnitt", value: 1 }
	]
	
	
</script>
<article class="text">
	<h2>
		{#if range>1}
			Gjennomsnitt diagnoser siste {range}-dagersperiode: 
		{:else}
			Diagnoser siste dag:
		{/if}
		{#if currAvg}
			{#if range>1}
				<span class="sistedag" style="color: {textHighlightColor}">
					{new Intl.NumberFormat("no-NO").format(currAvg)}
				</span>
			{:else}
				<span class="sistedag">{new Intl.NumberFormat("no-NO").format(currAvg)}</span>
			{/if}
		{:else} 
			Ikke noe gjennomsnitt for valgt periode.
		{/if}
	</h2>
	<p>
		<span>
			{#if range>1}
				<span style="color: {textHighlightColor}">
					Glidende gjennomsnitt</span> over {range} dager.
			{:else}
				Alle tall mellom {firstRepShort} og {lastRepShort}.
			{/if} 
		</span>
	</p>

</article>

<section>
	<article class="chart">

		<LineBarDay 
			{max} {charts} {shavedMvAvg} {shavedData} {mvUniqueDates} {lineUniqueDates} {options}
		/>
		
	</article>
	<article class="controls">
		<!-- <Brush 
			bind:min={start}
			bind:max={end}
		/> -->
		<LineBrush 
			bind:min={start}
			bind:max={end}
			x={'date'}
			y={'new'}
			data={data.data.new}
			{highlightColor}
		/>
	
	<Gjennomsnitter bind:range />
	
	<div class="radios">
		<label for="radio">Vis: </label>
		<select id="radio" bind:value={charts}>
			{#each modeSelect as {label, value}}
			<option value={value}>{label}</option>
			{/each}
		</select>
	</div>

	</article>
</section>

	<MiniJHday {start} {end} {range} {highlightColor} {mainSelection} />

<style>
	.controls .radios {
		margin-top: 1rem;
		font-size: .8rem;
	}
	.controls label {
		display: inline-block;
		margin-right: .5rem;
	}
@media only screen and (max-width: 800px) {
	.sistedag {
		display: block;
	}
}
	.radios {
		display: inline-block;
		width: 45%;
		min-width: 200px;
		max-width: 500px;
	}

</style>


