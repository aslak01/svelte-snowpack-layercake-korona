<script>

	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import MultiLine from './components/MultiLine.svelte';
	import AxisX from './components/AxisX.html.svelte';
	import AxisY from './components/AxisY.html.svelte';
	import SharedTooltip from './components/SharedTooltip.percent-range.svelte';
	// import Labels from './components/Labels.svelte';

	import raw from './data/convertcsv.json'		
	const data = raw.map(({ FIELD1: År, ...rest }) => ({ År, ...rest }));
	export let koronaVirus
	
	const xTickColor = "#fff";
	const yTickColor = "#ccc";
	
	const restligeDiag = ["Syst. meningokokksykdom", "Aids", "Paratyfoidfeber", "Tyfoidfeber", "Syst. pneumokokksykdom", "Virale infeksjoner i sentralnervesystemet", "Syst. gr. B streptokokksykdom", "Syst. gr. A streptokokksykdom", "Prionsykdommer", "Alvorlige importsykdommer", "Alvorlige miljøsykdommer", "Mat- og vannbårne sykdommer", "Sykdommer forårsaket av visse resistente mikrober", "Sykdommer som forebygges gjennom Barnevaksinasjonsprogrammet", "Virushepatitter", "Zoonoser"]

	const ignored = ["Seksuelt overførbare sykdommer", "År"]
	
	var sumobjects = data.map(y => Object.keys(y).filter(k=>k!==ignored.some(p=>p===k)).reduce((x,z) => x + y[z], 0));
	
	let summedData = []
  sumobjects.forEach(function (value, index) {
		if (data[index].År < 2020) {
			summedData.push({
				"År": data[index]["År"],
				"Covid-19": 0,
				"Restlige diagnoser": value,
				"Seksuelt overførbare sykdommer": data[index]["Seksuelt overførbare sykdommer"]
			})
		} else if (data[index].År === 2020) {
				summedData.push({
					"År": data[index]["År"],
					"Covid-19": koronaVirus,
					"Restlige diagnoser": value,
					"Seksuelt overførbare sykdommer": data[index]["Seksuelt overførbare sykdommer"]
				})
		}
  });

	
	
	const xKey = 'År';
	const yKey = 'value';
	const zKey = 'key';

	const seriesNames = Object.keys(summedData[0]).filter(d => d !== xKey);
	let seriesColors = [ '#2b8dcf',"#ffa600", '#fa6eb8',  ] 
	
	data.forEach(d => {
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

		
	const dataLong = seriesNames.map(key => {
		return {
			key,
			values: summedData.map(d => {
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

let viserDiag = false
const visDiag = () => {
	viserDiag = !viserDiag
}


</script>

<article class="text">
<h2>Sykdom rapportert til MSIS, 2016-2020</h2>
<p>Data fra <a href="https://statistikk.fhi.no/msis">det nasjonale overvåkingssystemet for smittsomme sykdommer (MSIS)</a>.</p>
<p>Under er er en oppsummering i tre kategorier: 
<strong style="color:{seriesColors[2]}">seksuelt overførbare sykdommer</strong>, 
<strong style="color:{seriesColors[0]}">Covid-19</strong> og
<strong class="pointer" style="color:{seriesColors[1]}" on:click={() => visDiag()}>restlige diagnosekategorier</strong>.
	
</p>
<p>
	<span>
			{#if viserDiag}
			<p><strong>Restlige diagnosekategorier (Covid-19 isolert ut av kategorien "Alvorlige, systemiske sykdommer", hvorav de øvrige diagnosene vises individuelt):</strong></p>
			<p><a href="https://www.fhi.no/contentassets/88572059c1f34197ad1d07dd83ae63ed/msis_meldingskriterier_per_28042020.pdf">Definisjon av hvilke sykdommer som registreres</a>.</p>
				<ul>
					{#each restligeDiag as diag}<li>{diag}</li>{/each}
				</ul>
			{/if}
	</span>
</p>
</article>




<section>


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
						{xTickColor}
						snapTicks={true}
						ticks={data.map(d => d[xKey]).sort((a, b) => a - b)}
					/>
					<AxisY 
						ticks={4}
						gridlines={true}
						formatTick={formatTickY}
						{yTickColor}
					/>
				</Html>
				<Html>
					<!-- <Labels/> -->
					<SharedTooltip
						dataset={summedData}
					/>
				</Html> 
			</LayerCake>
		</div>
	</article>
</section>
<style>
.pointer {
	cursor: pointer;
}
</style>