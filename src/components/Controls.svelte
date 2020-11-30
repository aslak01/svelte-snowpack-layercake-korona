<script>
	import Gjennomsnitter from './Gjennomsnitter.svelte'
	import Select from 'svelte-select'

	import {minidaySettings, minidayCharts} from '../utils/store.js';
	
	import { countries as items, regions } from '../utils/searchcountries.js'
	import norskeRegioner from '../data/countries/no_regions.json'

	let subregions = false;

	// let selectedValue = $minidaySettings.selectedValue;

	// $: skala = $minidaySettings.skala;
	
	const skalaSelect = [
		{ label: "Individuell absolutt skala", value: 1 },
		{ label: "Delt absolutt skala", value: 2 },
		{ label: "Delt relativ skala (per million)", value: 3 },
	]
	
	
	
	const oversettelse = function(region, sub) {
		return sub ? norskeRegioner.subregions.filter(i => i.subregion === region) : norskeRegioner.regions.filter(i => i.region === region)
	}
	
	const selectRegion = function (region, sub) {
		let result = regions.data.filter(obj => {
			if (sub) {
				return obj.subregion === region
			}
			return obj.region === region
		})
		$minidayCharts = []
		$minidayCharts = result
	}
	const selectWorld = function () {
		$minidayCharts = []
		let result = regions.data.map(obj => {
			return obj.value
		})
		let uniq = [...new Set(result)];
		console.log(uniq)
		$minidayCharts = uniq
	}
	
	// sortere subregioner
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
			<Gjennomsnitter />
		</div>
		<label for="skala">Skala: 
			<select id="skala" bind:value={$minidaySettings.skala}>
				{#each skalaSelect as {label, value}}
					<option value={value}>{label}</option>
				{/each}
			</select>
		</label>
		<label>Oversatt navn: <input type="checkbox" bind:checked={$minidaySettings.navnOversatt}></label>
		<div class="selectregions">
			Velg et kontinent for sammenligning:
			{#each regions.meta.regions as region} 
			<button on:click={() => selectRegion(region, false)}>
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
					<button on:click={() => selectRegion(region, true)}>
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

<slot></slot>

<article class="text" style="padding-top:1.5rem">
	<p><span>Legg til eller fjern land, du kan søke etter land på norsk, engelsk, tysk og fransk.</span></p>

	<!-- <CountryMultiselect /> -->
	{#await $minidayCharts[0]}
	<div class="themed">
		<Select
			{items}
			bind:$minidayCharts
			isMulti={true}
			listPlacement='bottom'
		></Select>
	</div>
	{/await}
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
