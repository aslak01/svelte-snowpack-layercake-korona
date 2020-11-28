<script>

	import Car32 from "carbon-icons-svelte/lib/Car32";
	import Bus32 from "carbon-icons-svelte/lib/Bus32";
	import Pedestrian32 from "carbon-icons-svelte/lib/Pedestrian32";
	import Close32 from "carbon-icons-svelte/lib/Close32";
	
	import { LayerCake, ScaledSvg, Html, uniques } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	
	import { computeMovingAverage, cutData } from './utils/functions.js'

	import MultiLine from './components/MultiLine.svelte';
	import AxisX from './components/AxisX.html.svelte';
	import AxisY from './components/AxisY.html.svelte';
	import SharedTooltip from './components/SharedTooltip.percent-range.svelte';
	
	import LineBrush from './components/LineBrush.svelte'
	import Gjennomsnitter from './components/Gjennomsnitter.svelte'
	let start = 0;
	let end = 1;

	
	export let highlightColor
	
	export let data

	data.data.forEach((e) => {
		delete e["sub-region"];
		delete e["subregion_and_city"];
		delete e["geo_type"];
	});
	
	
	let data2 = data.data;
	// console.log(data2)
	const seriesNames = Object.keys(data2[0]).filter(d => d !== xKey);

	// import AreaStacked from './components/AreaStacked.svelte';
// 	import { stack } from 'd3-shape';
// 	
// 	const stackData = stack().keys(seriesNames);
// 	
// 	let series = stackData(data2)
// 	console.log(series)
// 	const yKey = [0, 1];
// 
// 	
// 	data2.forEach(d => {
// 		d[xKey] = typeof d[xKey] === 'string' ? new Date(d[xKey]) : d[xKey];
// 		seriesNames.forEach(name => {
// 			d[name] = +d[name];
// 		});
// 	});
	
	let range = 7;

	const xKey = 'date';
	const yKey = 'value';
	const zKey = 'key';

	const xTickColor = "#fff";
	const yTickColor = "#ccc";


	
	$: MovingAverage = computeMovingAverage(data2, range, xKey, seriesNames);

	
	let seriesColors = ['#2b8dcf', '#fa6eb8', "#ffa600"]
	
	const brightColors = ['#2b8dcf', '#fa6eb8', "#ffa600"]
	const mutedColors = ['#63344d', '#1a3248', '#443014']
	
	const brightCar = ['#2b8dcf', '#63344d', '#443014']
	const brightBus = ['#1a3248', '#fa6eb8', '#443014']
	const brightPed = ['#1a3248', '#63344d', "#ffa600"]
	
	const mutedCar = ['#63344d','#fa6eb8', "#ffa600"]
	const mutedBus = ['#2b8dcf','#1a3248', "#ffa600"]
	const mutedPed = ['#2b8dcf', '#fa6eb8', '#443014']
	
	let shavedMvAvg
	$: shavedMvAvg = cutData(MovingAverage, start, end)
	
	$: dataLong = seriesNames.map(key => {
		return {
			key,
			values: shavedMvAvg.map(d => {
				d[xKey] = typeof d[xKey] === 'string' ? new Date(d[xKey]) : d[xKey]; // Conditional required for sapper
				return {
					key,
					[yKey]: +d[key],
					[xKey]: d[xKey]
				};
			})
		};
	});
	
	let brushDataLong = seriesNames.map(key => {
		return {
			key,
			values: data2.map(d => {
				d[xKey] = typeof d[xKey] === 'string' ? new Date(d[xKey]) : d[xKey]; // Conditional required for sapper
				return {
					key,
					[yKey]: +d[key],
					[xKey]: d[xKey]
				};
			})
		};
	});

	const flatten = data => data.reduce((memo, group) => {
		return memo.concat(group.values);
	}, []);
	
	const formatTickY = d => new Intl.NumberFormat("no-NO").format(d);
	const formatTickX = d => new Date(d).toLocaleDateString('no-NO', {day: '2-digit', month: '2-digit', year: '2-digit'});

	





	$: mvAvgDtEnd = dataLong[0].values[dataLong[0].values.length-1].date.toLocaleDateString('no-NO')
	$: mvAvgDtStart = dataLong[0].values[0].date.toLocaleDateString('no-NO')
	$: mvUniqueDates = uniques(dataLong[0].values, "date")
	
	

	let highlightExists = false
	const selectHighlight = (item) => {
		if (item == "car") {
			seriesColors = brightCar
			highlightExists = true
		} else if (item == "bus") {
			seriesColors = highlightExists = brightBus
			
		} else if (item == "ped") {
			seriesColors = brightPed
			highlightExists = true
		} else if (item == "x"){
			seriesColors = brightColors
			highlightExists = false
		}
	}


</script>

<article class="text">
<h2>Mobilitetsdata fra Apple</h2>
<p>Viser relativ mengde bevegelse med 
	<strong class="modus" style="color:{seriesColors[0]}" on:click={() => selectHighlight("car")}>bil</strong>, 
	<strong class="modus" style="color:{seriesColors[1]}"on:click={() => selectHighlight("bus")}>kollektivtransport</strong> og 
	<strong class="modus" style="color:{seriesColors[2]}"on:click={() => selectHighlight("ped")}>til fots</strong> 
	relativt til Apples anslag av normalnivået.
	</p>
<p><span>{#if range>1}Glidende gjennomsnitt over {range} dager{:else}Alle tall{/if} mellom {mvAvgDtStart} og {mvAvgDtEnd}.</span></p>
</article>
<section>
	<article class="topcontrols" style="text-align: center">
			<Car32
				on:click={() => selectHighlight("car")}
				style="fill: {seriesColors[0]}" />
			<Bus32 
				on:click={() => selectHighlight("bus")}
				style="fill: {seriesColors[1]}" />
			<Pedestrian32 
				on:click={() => selectHighlight("ped")}
				style="fill: {seriesColors[2]}" />
			{#if highlightExists}
			<Close32
				class="xbtn"
				on:click={() => selectHighlight("x")}
			/>
			{/if}
	</article>
<article class="chart">
		<div class="chart-container">
			<LayerCake
				ssr={true}
				percentRange={true}
				x={xKey}
				y={yKey}
				z={zKey}
				zScale={scaleOrdinal()}
				zDomain={seriesNames}
				zRange={seriesColors}
				flatData={flatten(dataLong)}
				yDomain={[null, null]}
				data={dataLong}
			>
				<ScaledSvg>
					<MultiLine />
				</ScaledSvg>
				<Html>
					<AxisX
						gridlines={false}
						formatTick={formatTickX}
						snapTicks={true}
						ticks={[
							mvUniqueDates[0], 
							mvUniqueDates[Math.round((25/100)*mvUniqueDates.length)], 
							mvUniqueDates[Math.round(mvUniqueDates.length/2)], 
							mvUniqueDates[Math.round((75/100)*mvUniqueDates.length)], 
							mvUniqueDates[mvUniqueDates.length - 1]
						]}
					{xTickColor}
					/>
					<AxisY 
						ticks={4}
						gridlines={true}
						{yTickColor}
					/>
				</Html>				
				<Html>
					<SharedTooltip
						formatTitle={formatTickX}
						dataset={shavedMvAvg}
					/>
				</Html>
			</LayerCake>
		</div>
	</article>	
	<article class="controls">
		<LineBrush 
			bind:min={start}
			bind:max={end}
			data={data2}
			x={xKey}
			y={'driving'}
			yDomain={[null, null]}
			{highlightColor}
		/>
		<Gjennomsnitter bind:range />
	</article>

</section>

<style>

strong.modus{
	cursor:pointer;
}
.gjennomsnitter {
	margin-top: 3rem;
	width: 45%;
	min-width: 200px;
	max-width: 500px;
}


</style>
