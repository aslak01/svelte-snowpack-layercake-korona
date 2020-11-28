<script>
// 	import { SpinLine } from 'svelte-loading-spinners';
	// import Coronavirus32 from "carbon-icons-svelte/lib/Coronavirus32";
// 	
// 	import { getData } from './utils/fetch.js'
// 	import { getData2 } from './utils/fetch1.js';
// 
// 	const response3 = getData("https://api.apify.com/v2/key-value-stores/3qlmMu1XN2ZLoVIQt/records/LATEST?disableRedirect=true");
	
	// todo:
	// solid line at 0 in apple chart
	// error handling apple chart
	// organising minidays by insidens
	// disable dropdown on countryadd
	// la bruker søke på et land som finnes i defaultsene uten at det kræsjer
	// fikse bugg i at max ikke reguleres ned når et miniday lukkes
	
	// import ChartsJHday from './ChJH.day.svelte';
	// import ChartsJHtot from './ChJH.tot.svelte';
	// import ChartsApple from './ChApple.svelte';
	// import ChartsFHI from './ChFHI.svelte';
	
	// import CountrySearch from './CountrySearch.svelte';
	// 
	const highlightColor = "black"
	// 
	// let selectedValue = {label: "Norge", value: "nor"}
	// import ChartsKart1 from './ChKart.svelte';
	
	// let request
	// 
	// $: selectedValue ? request = selectedValue.value : request = "Norway"
	// 
	// $: response = getData2("https://disease.sh/v3/covid-19/historical/" + request + "?lastdays=all")
	// $: response2 = getData("https://disease.sh/v3/covid-19/apple/countries/" + request + "/All");
	 import MiniJHday from './MiniJHday.svelte';

</script>

<main>
<header>
<article class="text">
	<h1 class="header">	
		<!-- <Coronavirus32 
			style="fill: {highlightColor}"
		/> -->
		Korona&shy;virus i </h1>
</article>
</header>

<section>
	<MiniJHday {highlightColor} />
</section>
 
	 <footer>
		 <article class="text">
			 <p><span>
				 Denne siden holdes automatisk oppdatert med de siste tallene fra <a href="https://coronavirus.jhu.edu">Johns Hopkins-databasen (JHUCSSE)</a>. De samler tallene sine fra diverse offentlige databaser som ikke alltid er helt enige med hverandre. Mindre avvik kan derfor forekomme, men tendensene er som regel de samme. JHUCSSE- og Apple-tall via <a href="http://disease.sh">disease.sh</a>.
			 </span></p>
		 </article>
	 </footer>

</main>

<style>

:global(body) {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;	
}

main {
	max-width: 100%; overflow-x: hidden;
	background: ghostwhite;	
	min-height: 100vh;
}
section, header, footer {
	width: 80vw;
	margin: 0 auto;
}

	h1 {
		padding-top: 100px;
	}
	
	h1.header {
		display: inline;
	}
	
	article.text {
	width: 80vw;
	max-width: 1200px;
	margin: 0 auto;
	height: auto;
	padding-bottom: 1.5rem;
	padding-top: 3rem;
	}
	a {
		/* color: #fae955; */
		color: #ded68c;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	a:visited {
		color: #c7bfbf;
	}

</style>