<script lang="ts">
	import type { PageData } from './$types';
	import type { EventList } from '$lib/types/types';
	import Card from '$lib/components/Card.svelte';

	export let data: PageData;

	$: results = data.searchResults as EventList;
</script>

<svelte:head>
	<title>Cineville</title>
	<meta name="description" content="Cineville" />
</svelte:head>

<section>
	<h1>Search results for "{data.query}"</h1>

	{#if results._embedded.events.length === 0}
		<p>No results found.</p>
	{:else}
		<ul>
			{#each results._embedded.events as screening}
				<li>
					<Card {screening} />
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	h1 {
		width: 100%;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}
</style>
