<script lang="ts">
	import type { PageData } from './$types';
	import type { EventList } from '$lib/types/types';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import { MAX_DAYS_AHEAD } from '$lib/utils/constants';
	import { startOfDay } from '$lib/utils';

	export let data: PageData;

	$: screenings = data.screenings as EventList;

	const today = startOfDay(new Date());

	function parseDateParam(value: string | null): Date {
		if (!value) return today;
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return today;
		return startOfDay(parsed);
	}

	let currentDate = parseDateParam(data?.date ?? null);

	$: daysFromToday = Math.max(
		0,
		Math.floor((currentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
	);

	function getDayAtOffset(offset: number) {
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
	<h1>Film Schedule for {currentDate.toDateString()}</h1>

	<div class="date-navigation">
		<div class="date-buttons">
			<button on:click={() => getDayAtOffset(0)} disabled={daysFromToday === 0}>Today</button>
			<button on:click={() => getDayAtOffset(1)} disabled={daysFromToday === 1}>Tomorrow</button>
			<button on:click={() => getDayAtOffset(2)} disabled={daysFromToday === 2}>+ 2</button>
			<button on:click={() => getDayAtOffset(3)} disabled={daysFromToday === 3}>+ 3</button>
			<button on:click={() => getDayAtOffset(4)} disabled={daysFromToday === 4}>+ 4</button>
			<button on:click={() => getDayAtOffset(5)} disabled={daysFromToday === 5}>+ 5</button>
			<button on:click={() => getDayAtOffset(6)} disabled={daysFromToday === 6}>+ 6</button>
			<button
				on:click={() => getDayAtOffset(MAX_DAYS_AHEAD)}
				disabled={daysFromToday === MAX_DAYS_AHEAD}
			>
				+ 7
			</button>
		</div>
	</div>

	{#if screenings}
		<ul>
			{#each screenings._embedded.events as screening}
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

	.date-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0;
		width: 100%;
		flex-wrap: wrap;
	}

	.date-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: first baseline;
	}

	.date-navigation button {
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
