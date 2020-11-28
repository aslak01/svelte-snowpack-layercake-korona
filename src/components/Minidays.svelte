<script>
import { getData } from '../utils/fetch.js';
import { getData2 } from '../utils/fetch1.js';
import ChDayMini from '../ChJH.miniday.svelte';

export let range = 7;
export let start = 0;
export let end = 1;
export let country;
export let highlightColor;
export let index;
export let skala = 1

let req = getData2("https://disease.sh/v3/covid-19/historical/" + country + "?lastdays=all");

let cData = getData('https://restcountries.eu/rest/v2/alpha/' + country + "?fields=population;nativeName");


</script>


	{#await $req}...{:then data}
		{#await $cData}...{:then cData}
			<ChDayMini {range} {start} {end} {country} {data} {cData} {highlightColor} {index} {skala} />
		{/await}
	{/await}
