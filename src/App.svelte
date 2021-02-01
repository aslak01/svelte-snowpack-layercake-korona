<script>
	import Charts from './Charts.svelte';
	import MiniWorld from './components/MiniWorld.svelte'
</script>

<main>
<header>
<article class="text">
	<h1 class="header">Corona virus in the world</h1>
</article>
<MiniWorld />
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


@font-face {
	font-family: 'Eesti';
	font-weight: 500;
	font-style: normal;
	src: url('/fonts/GT-Eesti-Pro-Text-Medium.woff2') format('woff2'),
			 url('/fonts/GT-Eesti-Pro-Text-Medium.woff') format('woff'),
			 url('/fonts/GT-Eesti-Pro-Text-Medium.otf')  format('opentype');
}
@font-face {
	font-family: 'Eesti';
	font-weight: 400;
	font-style: normal;
	src: url('/fonts/GT-Eesti-Pro-Text-Regular.woff2') format('woff2'),
			 url('/fonts/GT-Eesti-Pro-Text-Regular.woff') format('woff'),
			 url('/fonts/GT-Eesti-Pro-Text-Regular.otf')  format('opentype');
}
@font-face {
	font-family: 'Eesti';
	font-weight: 400;
	font-style: italic;
	src: url('/fonts/GT-Eesti-Pro-Text-Book-Italic.woff2') format('woff2'),
			 url('/fonts/GT-Eesti-Pro-Text-Book-Italic.woff') format('woff'),
			 url('/fonts/GT-Eesti-Pro-Text-Book-Italic.otf')  format('opentype');
}
@font-face {
	font-family: 'Eesti';
	font-weight: 700;
	font-style: normal;
	src: url('/fonts/GT-Eesti-Pro-Text-Bold.woff2') format('woff2'),
			 url('/fonts/GT-Eesti-Pro-Text-Bold.woff') format('woff'),
			 url('/fonts/GT-Eesti-Pro-Text-Bold.otf')  format('opentype');
}


:global(body) {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	/* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; */	
	font-family: "Eesti";
	color: #212312;
}
:global(input, button, select) {
	font-family: "Eesti";
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