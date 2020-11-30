<script>
	import {minidaySettings} from '../utils/store.js';

</script>




<div class="gjennomsnitter">
	<label>
		Endre periode for glidende gjennomsnitt:
		<input type="range" min="1" max="60" bind:value={$minidaySettings.range} />
</label>

		<nav>
			<button 
				class:active={($minidaySettings.range == 1)}
				on:click={() => $minidaySettings.range = 1}>0</button>
			<button
				class:active={($minidaySettings.range == 7)}
			 on:click={() => $minidaySettings.range = 7}>1 uke</button>
			<button
			class:active={($minidaySettings.range == 30)}
			on:click={() => $minidaySettings.range = 30}>1 mnd</button>
			<button
			class:active={($minidaySettings.range == 60)}
			on:click={() => $minidaySettings.range = 60}>2 mnd</button>
		</nav>
</div>

<style>
	nav {
		float: right;
	}
	button {
		display: inline-block;
		padding: .2rem;
		cursor: pointer;
		background: #333;
		color: ghostwhite;
		border-radius: 3px;
		line-height: 1rem;
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
	@media only screen and (max-width: 700px) {
		.gjennomsnitter {
			width: 100%;
		}
	}
	@media only screen and (min-width: 700px) {
		.gjennomsnitter {
			width: 45%;
			margin-right: 3rem;
			max-width: 500px;
		}
	}
	
	.gjennomsnitter {
		display: inline-block;
		min-width: 200px;
		margin-bottom: 1rem;
	}
	input {
		margin-top: 1rem;
	}
	input[type=range] {
		-webkit-appearance: none;
		width: 100%;
		padding: 0;
		border: 0;
	}
	input[type=range]:focus {
		outline: none;
	}
	input[type=range]::-webkit-slider-runnable-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: slategray;
	}
	input[type=range]::-webkit-slider-thumb {
		height: 26px;
		width: 26px;
		border-radius: 26px;
		background: #333;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -13px;
	}
	input[type=range]:focus::-webkit-slider-runnable-track {
		background: slategray;
	}
	input[type=range]::-moz-range-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: black;
	}
	input[type=range]::-moz-range-thumb {
		height: 26px;
		width: 26px;
		border-radius: 26px;
		background: #ffffff;
		cursor: pointer;
	}
	input[type=range]::-ms-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type=range]::-ms-fill-lower {
		background: black;
	}
	input[type=range]::-ms-fill-upper {
		background: black;
	}
	input[type=range]::-ms-thumb {
		height: 26px;
		width: 26px;
		border-radius: 26px;
		background: white;
		cursor: pointer;
	}
	input[type=range]:focus::-ms-fill-lower {
		background: black;
	}
	input[type=range]:focus::-ms-fill-upper {
		background: black;
	}
	
	</style>