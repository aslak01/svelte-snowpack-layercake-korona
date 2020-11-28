<script>
	import { onMount } from 'svelte';
	import { minidayStore, minidaySettings, minidayCopy} from './utils/store.js';
	import Minidays from './components/Minidays.svelte';
	import { uniqueByKeepLast } from './utils/functions.js'
	import Gjennomsnitter from './components/Gjennomsnitter.svelte'
	
	import CountryMultiselect from './components/CountryMultiselect.svelte'

	import Select from 'svelte-select'
	import { countries as items, regions } from './utils/searchcountries.js'
	import norskeRegioner from './data/countries/no_regions.json'
	export let mainSelection;

	let selectedValue = [];

	export let highlightColor;	
	export let range = 7;
	export let start = 0;
	export let end = 1;
	
	let subregions = false;

	let skala = 3
	const skalaSelect = [
		{ label: "Individuell absolutt skala", value: 1 },
		{ label: "Delt absolutt skala", value: 2 },
		{ label: "Delt relativ skala (per million)", value: 3 },
	]
	let maximum
	let pMmax
	
	$: maximum = Object.values($minidayStore).map(v => v.aMax)
	$: pMmax = Object.values($minidayStore).map(v => v.pMmax)
	
	$: $minidaySettings.aMax = maximum[0] != undefined ? Math.max.apply(Math, maximum) : undefined
	$: $minidaySettings.pMax = pMmax[0] != undefined ? Math.max.apply(Math, pMmax) : undefined
	$: $minidaySettings.skala = skala
	$: $minidaySettings.navnOversatt = true
	
	let defaults = [{label: "Norge", value: "nor"}, {label: "Storbritannia", value: "gbr"}, {label: "USA", value: "usa"}, {label: "Tyskland", value: "deu"}, {label: "Frankrike", value: "fra"}]

	onMount(()=>{
		selectedValue.push(...defaults)
	})
	
	const oversettelse = function(region, sub) {
		return sub ? norskeRegioner.subregions.filter(i => i.subregion === region) : norskeRegioner.regions.filter(i => i.region === region)
	}

	const activeClFilter = function (region, sub) {
		let result = regions.data.filter(obj => {
			if (sub) {
				return obj.subregion === region
			}
			return obj.region === region
		})
		// console.log(result === selectedValue)
		return result === selectedValue
	}	
	
	const selectRegion = function (region, sub) {
		let result = regions.data.filter(obj => {
			if (sub) {
				return obj.subregion === region
			}
			return obj.region === region
		})
		selectedValue = []
		selectedValue = result
	}
	const selectWorld = function () {
		selectedValue = []
		let result = regions.data.map(obj => {
			return obj.value
		})
		let uniq = [...new Set(result)];
		console.log(uniq)
		selectedValue = uniq
	}
	
	const unsortedSubr = regions.meta.subregions
	
	// sort by 2nd word
	const sorted = unsortedSubr.sort((a, b) => {
		const s1 = a.split(' ')[1],
					s2 = b.split(' ')[1];
		return (s1 || a).localeCompare(s2 || b)
	});
	


</script>



<article class="text">
	<h2 style="margin:0;padding:0;">Sammenlign land</h2>
	
		<p><span>Definer tidsramme og periode for glidende gjennomsnitt med kontrollene over.</span></p>
		<div class="control-section">
			<Gjennomsnitter bind:range/>
		</div>
		<label for="skala">Skala: 
			<select id="skala" bind:value={skala}>
				{#each skalaSelect as {label, value}}
					<option value={value}>{label}</option>
				{/each}
			</select>
		</label>
		<label>Oversatt navn: <input type="checkbox" bind:checked={$minidaySettings.navnOversatt}></label>
		<div class="selectregions">
			Velg et kontinent for sammenligning:
			{#each regions.meta.regions as region} 
			<button class:active={(activeClFilter(region, false))} on:click={() => selectRegion(region, false)}>
				{oversettelse(region, false)[0].norsk}
			</button>
			{/each}
			<button on:click={() => selectWorld()}>Verden</button>
			eller legg til/fjern land selv i boksen under grafene. <br>
			<div class="subregions">
				{#if !subregions}
					<button on:click={() => subregions = !subregions }>
						Vis regioner
					</button>
				{/if}
				{#if subregions}
				Velg en region:
				{#each sorted as region} 
					<button class:active={(activeClFilter(region, true))} on:click={() => selectRegion(region, true)}>
						{oversettelse(region, true)[0].norsk}
						<!-- {region} -->
					</button>
				{/each}
				<button on:click={() => subregions = !subregions } style="cursor:pointer">X</button>
			{/if}
		</div>
		</div>

		<!-- broken: -->		
		<!-- <label>Sortert: <input type="checkbox" bind:checked={isSorted}></label> -->
</article>

{#if selectedValue}
	<section class="minidays">
		{#each selectedValue as country, index (country.value)}
			<Minidays {range} {start} {end} country={country.value} {highlightColor} {index} {skala} />
		{/each}
	</section>
{/if}

<!-- debug buttons -->
<!-- <button on:click={console.log($minidayStore)}>MinidayStore</button>
<button on:click={console.log($minidaySettings)}>minidaySettings</button> -->

<article class="text" style="padding-top:1.5rem">
	<p><span>Legg til eller fjern land, du kan søke etter land på norsk, engelsk, tysk og fransk.</span></p>

	<!-- <CountryMultiselect /> -->
	<div class="themed">
		<Select
			{items}
			bind:selectedValue
			isMulti={true}
			listPlacement='bottom'
		></Select>
	</div>
</article>

<style>
	label {
		font-size: .8rem;
	}
.themed {
	--itemColor: #333;
	--itemIsActiveColor: #333;
	color: #333;
	--inputColor: white;
	--background: transparent;
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
}

.selectregions {
	font-size: .8rem;
	margin-top: .5rem;
}
.subregions {
	font-size: .7rem;
}

button {
	margin-right: .3rem;
	margin-bottom: .3rem;
	display: inline-block;
	padding: .3rem;
	cursor: pointer;
	background: #333;
	color: ghostwhite;
	border-radius: 3px;
	border: 0;
}
button:hover {
	background: #ffa600;
	text-decoration: none;
}
button.active {
	background: ghostwhite;
	color: black;
}
	
</style>