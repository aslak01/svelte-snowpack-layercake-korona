<script>

	import { LayerCake, ScaledSvg, Html, uniques } from 'layercake';
	import { scaleBand } from 'd3-scale';
	
	import Column from './Column.svelte'
	import Line from './Line.svelte';
	import Area from './Area.svelte';
	import AxisX from './AxisX.html.svelte';
	import AxisY from './AxisY.html.svelte';
	import SharedTooltip from './SharedTooltip.percent-range.svelte';

	export let max
	export let charts
	
	export let shavedMvAvg
	export let shavedData
	export let mvUniqueDates
	export let lineUniqueDates
	export let options = { day: 'numeric', month: 'numeric', year: '2-digit' }
	
	
	const formatTickX = d => new Date(d).toLocaleDateString('no-NO', options);
	const formatTickY = d => new Intl.NumberFormat("no-NO").format(d);
	const stroke = '#ffa600';
	const mainLineStrokeWidth = 5;
	const xTickColor = "#ffa600";
	const yTickColor = "#ffa600";
	const colCol = "#ccc"

</script>

<div class="chart-container">
	{#if charts >= 2}
	<LayerCake
		percentRange={true}
		position='absolute'
		x='date'
		y='new'
		xDomain={mvUniqueDates}
		xScale={scaleBand()}
		data={shavedData}
		yDomain={[0, max]}
	>
		<ScaledSvg>
			<Column
				stroke={stroke}
				fill={colCol}
			/>
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
				formatTick={formatTickY}
				{yTickColor}
			/>
		</Html>
		{#if charts==2}
		<Html>
			<SharedTooltip
				formatTitle={formatTickX}
				dataset={shavedData}
			/>
		</Html>
		{/if}
	</LayerCake>
	{/if}
	{#if charts == 3 || charts == 1}
	
	{#if charts === 1}
	<LayerCake
		percentRange={true}
		position='absolute'
		x='date'
		y='avg'
		data={shavedMvAvg}
		yDomain={[0, Math.max.apply(Math, shavedMvAvg.map(function(o) { return o.avg; }))]}
		xDomain={lineUniqueDates}
		xScale={scaleBand()}
	>
	<ScaledSvg>
		<Line
			stroke={stroke}
			strokeWidth=2
		/>
		<Area
			fill={stroke}
		/>
	</ScaledSvg>
	<Html>
	<AxisX
		gridlines={false}
		formatTick={formatTickX}
		ticks={[
		lineUniqueDates[0], 
		lineUniqueDates[Math.round((25/100)*lineUniqueDates.length)], 
		lineUniqueDates[Math.round(lineUniqueDates.length/2)], 
		lineUniqueDates[Math.round((75/100)*lineUniqueDates.length)], 
		lineUniqueDates[lineUniqueDates.length - 1]
		]}
		{xTickColor}
	/>
		<AxisY 
			ticks={4}
			gridlines={true}
			{yTickColor}
			formatTick={formatTickY}
		/>
	</Html>
	<Html>
		<SharedTooltip
			formatTitle={formatTickX}
			dataset={shavedMvAvg}
		/>
	</Html>
	</LayerCake>
	{:else}
	<LayerCake
		percentRange={true}
		position='absolute'
		x='date'
		y='avg'
		data={shavedData}
		yDomain={[0, Math.max.apply(Math, shavedData.map(function(o) { return o.new; }))]}
		xDomain={mvUniqueDates}
		xScale={scaleBand()}
	>

	<ScaledSvg>
		<Line
			stroke={stroke}
			strokeWidth={mainLineStrokeWidth}
		/>
	</ScaledSvg>
	<Html>
	<AxisX
		gridlines={false}
		formatTick={formatTickX}
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
			ticks={0}
			gridlines={false}
			{yTickColor}
			formatTick={formatTickY}
		/>
	</Html>
	<Html>
		<SharedTooltip
			formatTitle={formatTickX}
			dataset={shavedData}
		/>
	</Html>
	</LayerCake>
	{/if}
{/if}
</div>

<style>
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
</style>