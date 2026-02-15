<script lang="ts">
	import type { PageData } from './$types';
	import type { EventList } from '$lib/types/types';
	import Card from '$lib/components/Card.svelte';
	import { MAX_DAYS_AHEAD } from '$lib/utils/constants';
	import { formatDate, startOfDay } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: screenings = data.screenings as EventList;

	const today = startOfDay(new Date());
	let currentDate = today;
	let offset = 0;

	function getDayAtOffset(newOffset: number) {
		offset = newOffset;
		const target = new Date(today);
		target.setDate(today.getDate() + offset);
		currentDate = target;
		goto(`/v2?date=${target.toISOString()}`);
	}
</script>

<svelte:head>
	<title>Cineville</title>
	<meta name="description" content="Cineville" />
</svelte:head>

<section>
	<h1>Film Schedule for {formatDate(currentDate.toISOString())}</h1>

	<div class="date-buttons">
		<button on:click={() => getDayAtOffset(0)} disabled={offset === 0}>Today</button>
		<button on:click={() => getDayAtOffset(1)} disabled={offset === 1}>Tomorrow</button>
		{#each Array(MAX_DAYS_AHEAD - 1) as _, i}
			<button on:click={() => getDayAtOffset(i + 2)} disabled={offset === i + 2}>+ {i + 2}</button>
		{/each}
	</div>

	{#if screenings}
		<ul>
			{#each screenings._embedded.events as screening}
				<li>
					<Card {screening} />
				</li>
			{/each}
		</ul>
	{:else}
		<p>No screenings found!</p>
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

	.date-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.date-buttons button {
		padding: 0.5rem 1rem;
		border: 1px solid red;
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
