<script lang="ts">
	import type { PageData } from './$types';
	import type { EventList } from '$lib/types/types';
	import { formatDateTime } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;

	$: screenings = data.screenings as EventList;
	$: currentDate = data.today;

	const amountOfDaysAhead = 7;
	// should be capped on max 7 days ahead, not jumping 7 days repeatedly
	function nextDay(daysAhead: number = 1) {
		const date = new Date(currentDate);
		date.setDate(date.getDate() + daysAhead);
		const dateStr = date.toISOString().split('T')[0];
		goto(`?date=${dateStr}${data.q ? `&q=${data.q}` : ''}`);
	}

	// $: searchResults = data.searchResults; // not implemented yet
	let searching = false;
	// if there are search result, put searching to false, otherwise true
	// $: searching = data.q ? !searchResults : false;
	// needs to be capped on today - 7 days ahead, NOT jumping 7 days repeatedly
	function searchMovie() {} // needs to be implemented
</script>

<svelte:head>
	<title>Cineville</title>
	<meta name="description" content="Cineville" />
</svelte:head>

<section>
	<h1>Film Schedule</h1>

	<p>I made a V2!</p>
	<div class="date-navigation">
		<p>Schedule for {formatDateTime(currentDate)}</p>
		<div>
			<button on:click={() => nextDay(1)}>Tomorrow</button>
			{#each Array(amountOfDaysAhead - 1) as _, i}
				<button on:click={() => nextDay(i + 2)}>
					+{i + 2} days
				</button>
			{/each}
		</div>
	</div>

	<form method="GET">
		<input name="q" value={data.q || ''} placeholder="(to be implemented)..." />
		<button on:click={() => (data.q = '')}>Clear </button>
		<button type="submit">Search</button>
	</form>

	{#if searching}
		<p>Searching for "{data.q}"...</p>
	{/if}

	{#if screenings}
		<ul>
			{#each screenings._embedded.events as screening}
				<a href={`/events/${screening.id}`}>
					<li>
						{#if screening._embedded.production?.assets.poster?.url}
							<img
								src={screening._embedded.production?.assets.poster?.url}
								alt={`${screening._embedded.production?.title} poster`}
								width="100"
							/>
						{/if}
						<div class="time-info">
							Starts at: {formatDateTime(screening.startDate)} - Ends at: {formatDateTime(
								screening.endDate
							)}
						</div>

						{screening._embedded.production?.title}
					</li>
				</a>
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
		padding: 1rem;
		margin: 0;
	}

	.date-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0;
		gap: 2rem;
		width: 100%;
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

	li {
		border-radius: 0.5rem;
		border: 1px solid red;
		/* padding: 1rem; */
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
	}

	a {
		width: 100%;
	}
	.time-info {
		font-size: 0.8rem;
		color: black;
	}
</style>
