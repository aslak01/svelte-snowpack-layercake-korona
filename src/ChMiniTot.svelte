<script>

	import { LayerCake, ScaledSvg, Html } from 'layercake';

	// import DualSlider from './utils/DualSlider.svelte';
	
	import Line from './components/Line.svelte';
	import AxisX from './components/AxisX.html.svelte';
	import AxisY from './components/AxisY.html.svelte';
	// import NumericLabels from './components/NumericLabels.svelte';
	
	const formatTickX = d => new Date(d).toLocaleDateString('no-NO', {day: '2-digit', month: '2-digit', year: '2-digit'});
	const stroke = '#eee';
	const textHighlightColor = "#ffa600";

	
	export let data
	export let name
	export let start = 0
	export let end = 1

	// Data cutter
	const chartData = data.data.total;
	const entries = chartData.length;
	
	let cutData = (data, x, y) => {
		let firstSlice = Math.round(start * entries)
		let lastSlice = Math.round(end*(entries))
		if (lastSlice-firstSlice>=2) {
			return data.slice(firstSlice, lastSlice)
		} else if (lastSlice < 2) {
			return data.slice(firstSlice, lastSlice+2)
		} else if (firstSlice-entries < 1) {
			return data.slice(firstSlice-2, lastSlice)
		}
	}
	let shavedData = chartData

	$: shavedData = cutData(chartData, start, end)
	
	$: noCaseFst = new Intl.NumberFormat("no-NO").format(shavedData[0].total)
	$: noCaseEnd = new Intl.NumberFormat("no-NO").format(shavedData[shavedData.length-1].total)
	$: lastDay = new Intl.NumberFormat("no-NO").format(shavedData[shavedData.length-1].total - shavedData[shavedData.length-2].total)
		
	
</script>



<div class="mini">
	<article class="minis">
		<article class="text">
			<h4>{name}</h4>
			<!-- <p><span>{firstRepShort}&ndash;{lastRepShort}.</span></p> -->
		</article>
		<div class="container-container">
		<div class="startCase">
			{noCaseFst}
		</div>
		<div class="endCase">
			{noCaseEnd}
			<br>
			+ <span style="color: {textHighlightColor}">{lastDay}</span>
		</div>

			<div class="chart-container">
				<LayerCake
					ssr={true}
					percentRange={true}
					x='date'
					y='total'
					yDomain={[null, null]}
					data={shavedData}
				>
					<ScaledSvg>
						<Line
							stroke={stroke}
						/>
					</ScaledSvg>
					<Html>
						<AxisX
							gridlines={false}
							formatTick={formatTickX}
							snapTicks={true}
							ticks={0}
						/>
						<AxisY 
							ticks={0}
							gridlines={false}
						/>
						<!-- <NumericLabels/> -->
					</Html>
				</LayerCake>
			</div>
		</div>
	</article>
</div>

<style>
	.mini  {
		height: 100px;
		width: 130px;
		margin-left: 10px;
	}
	.mini:last-of-type {
		margin-right: 10px;
	}
	.minis {
		padding: 0;
		height: 100px;
		width: 160px;
	}
	.minis .text {
		width: auto;
		height: auto;
		padding-bottom: 1rem;
	}
	.minis .text h4 {
		font-size: 1rem;
		margin: 0;
	}
	.container-container {
		height: 40px;
		width: 80px;
		position: relative;
	}	
	
	.startCase, .endCase {
		font-size: 8pt;
	}
	.startCase {
		position: absolute;
		bottom: -15px;
		left: -20px;
	}
	.endCase {
		position: absolute;
		top: -10px;
		right: -60px;
		text-align: right;
	}
</style>
