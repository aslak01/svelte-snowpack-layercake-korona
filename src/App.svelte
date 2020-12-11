<script>
	// small hack to get immerjs working.
	window.process = {
		env: {
			NODE_ENV: 'production',
		},
	};
	import { minidaySettings } from './utils/store.js';
	import { writable, get, derived } from 'svelte/store';
	import Charts from './Charts.svelte';
	
	let highlightColor = $minidaySettings.color;
	
	
	
	
	
	
	
</script>

<main>
<header>
<article class="text">
	<h1 class="header">Corona virus in the world</h1>
</article>
</header>

<section>
	<Charts />
</section>
 
	 <footer>
		 <article class="text">
			 <p>
				 Data is automatically updated with numbers from the <a href="https://coronavirus.jhu.edu">Johns Hopkins database (JHUCSSE)</a>. They collect data from various public databases, which are not always in agreement one with the other, which sometimes leads to discrepancies and erroneous data.
			 </p>
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
		font-size: 2rem;
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
		color: hsl(123, 50%, 50%);
		text-decoration: none;
	}
	a:visited {
		color: hsl(123, 50%, 50%);
	}
	a:hover {
		text-decoration: underline;
	}
	footer p {
		font-size: .7rem;
	}

</style>