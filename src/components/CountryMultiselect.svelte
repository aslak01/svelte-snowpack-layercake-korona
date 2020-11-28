<script>
	import {onMount} from 'svelte'
	import Select from 'svelte-select'
	export let selectedValue
	export let request

	let promise = Promise.resolve([]);
	async function fetchCountries() {
		const response = await self.fetch(request)
		if (response.ok) {
			let data = await response.json()
			return data.map(o => ({
				label: o.name,
				value: o.alpha3Code.toLowerCase()
			}))
		} else {
			throw new Error(countries);
		}
	}
	onMount( () => {
		promise = fetchCountries()
	});
</script>
<style>
	.search {
		width: 90%;
	}
</style>
{#await promise}...{:then items}
	<div class="search">
		<Select
			{items}
			isMulti={true}
			isClearable={true}
			bind:selectedValue
		/>
	</div>
{/await}