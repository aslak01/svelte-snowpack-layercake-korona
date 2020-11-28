<script>
	import { LayerCake, ScaledSvg } from 'layercake';
	import MultiLine from './MultiLine.svelte';
	import { scaleOrdinal } from 'd3-scale';
	
	export let x;
	export let y;
	export let data;
	export let z;
	export let zDomain
	export let zRange;
	export let flatData;
	export let yDomain;
	
	console.log(x, y, z, data, zDomain, zRange, flatData, yDomain)
	
	export let stroke = 'ghostwhite'
	export let strokeWidth = 1
	export let areaOpacity = .5
	export let brushBg = '#1a1f29'
	export let brushColor = 'ghostwhite'
	export let brushBlendMode = 'difference'
	export let brushHeight = '2rem'

	import { clamp } from 'yootils';
	
	export let min;
	export let max;
	
	let brush;
	
	const p = x => {
		const { left, right } = brush.getBoundingClientRect();
		return clamp((x - left) / (right - left), 0, 1);
	};
	
	const handler = fn => {
		return e => {
			if (e.type === 'touchstart') {
				if (e.touches.length !== 1) return;
				e = e.touches[0];
			}
			
			const id = e.identifier;
			const start = { min, max, p: p(e.clientX) };

			const handle_move = e => {
				if (e.type === 'touchmove') {
					if (e.changedTouches.length !== 1) return;
					e = e.changedTouches[0];
					if (e.identifier !== id) return;
				}
				
				fn(start, p(e.clientX));
			};

			const handle_end = e => {
				if (e.type === 'touchend') {
					if (e.changedTouches.length !== 1) return;
					if (e.changedTouches[0].identifier !== id) return;
				}
				
				window.removeEventListener('mousemove', handle_move);
				window.removeEventListener('mouseup', handle_end);
				
				window.removeEventListener('touchmove', handle_move);
				window.removeEventListener('touchend', handle_end);
			};

			window.addEventListener('mousemove', handle_move);
			window.addEventListener('mouseup', handle_end);

			window.addEventListener('touchmove', handle_move);
			window.addEventListener('touchend', handle_end);
		};
	};
	
	const reset = handler((start, p) => {
		min = clamp(Math.min(start.p, p), 0, 1);
		max = clamp(Math.max(start.p, p), 0, 1);
	});
	
	const move = handler((start, p) => {
		const d = clamp(p - start.p, -start.min, 1 - start.max);
		min = start.min + d;
		max = start.max + d;
	});
	
	const adjust_min = handler((start, p) => {
		min = p > start.max ? start.max : p;
		max = p > start.max ? p : start.max;
	});
	
	const adjust_max = handler((start, p) => {
		min = p < start.min ? p : start.min;
		max = p < start.min ? start.min : p;
	});
		
	$: left = 100 * min;
	$: right = 100 * (1 - max);
	
</script>

<div bind:this={brush} class="brush-outer" on:mousedown={reset} style="background: {brushBg}; height: {brushHeight}">
	{#if min !== null}
	<div class="chart-container">
		<LayerCake
			percentRange={true}
			{x} 
			{y}
			{z}
			{data}
			zScale={scaleOrdinal()}
			{zRange}
			{yDomain}
			>
				<ScaledSvg>
					<MultiLine />
				</ScaledSvg>
		</LayerCake>
	</div>
	<div class="brush-inner" 
		on:mousedown|stopPropagation={move} 
		on:touchstart|stopPropagation={move} 
		style="left: {left}%; right: {right}%; background: {brushColor}; mix-blend-mode: {brushBlendMode}">
	</div>
	<div class="brush-handle" on:mousedown|stopPropagation={adjust_min} on:touchstart|stopPropagation={adjust_min} style="left: {left}%;"></div>
	<div class="brush-handle" on:mousedown|stopPropagation={adjust_max} on:touchstart|stopPropagation={adjust_max} style="right: {right}%;"></div>
	{/if}
</div>

<style>
	.chart-container {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.brush-outer {
		position: relative;
		width: 100%;
		margin: 0 0 1em 0;
		overflow: hidden;
	}
	.brush-inner {
		position: absolute;
		height: 100%;
		cursor: move;
}
	.brush-handle {
		position: absolute;
		width: 15px;
		height: 100%;
		cursor: ew-resize;
	}
	/* .brush-handle::before {
		position: absolute;
		content: '';
		width: 5px;
		height: 100%;
		background: white;
		border-left: 2px solid tomato;
		border-right: 2px solid tomato;
	} */
</style>