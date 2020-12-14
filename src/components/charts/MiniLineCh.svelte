<script>
import { LayerCake, ScaledSvg, Html } from 'layercake';
import { scaleBand } from 'd3-scale';
import Line from './Line.svelte';
import Area from './Area.svelte';	
import Label from './Label.svelte';	
import Tooltip from './ShTt2.svelte'

export let data
export let yMax
export let xDomain
export let stroke
export let strokeWidth
export let labels
export let ttData
export let xKey
export let yKey

</script>

<LayerCake
	percentRange={true}
	x={xKey}
	y={yKey}
	data={data}
	yDomain={[0, yMax]}
	xDomain={xDomain}
	xScale={scaleBand()}
>
		<ScaledSvg>
			<Line
				{stroke}
				{strokeWidth}
			/>
			<Area 
				fill={stroke}
			/>
		</ScaledSvg>
		<Html>
			<Label
				labelValue={labels}
			/>
			<Tooltip 
				dataset={ttData}
			/> 
		</Html>
</LayerCake>