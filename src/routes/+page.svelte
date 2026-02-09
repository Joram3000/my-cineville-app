<script lang="ts">
	import type { PageData } from './$types';
	import type { EventList } from '$lib/types/types';
	import { formatDateTime } from '$lib/utils';
	export let data: PageData;

	$: screenings = data.screenings as EventList;
	$: console.log('schedule', screenings);
</script>

<svelte:head>
	<title>Cineville</title>
	<meta name="description" content="Cineville" />
</svelte:head>

<section>
	<h1>Cineville Film Schedule</h1>

	<form method="GET">
		<input name="q" value={data.q || ''} placeholder="Search movie..." />
		<button on:click={() => (data.q = '')}>Clear </button>
		<button type="submit">Search</button>
	</form>

	<div class="date-navigation">
		<button on:click={() => console.log('previous')} disabled={true}>previous day</button>

		<p>This is the scheme for "TODAY"</p>

		<button on:click={() => console.log('next')}>next day</button>
	</div>
	{#if screenings}
		<ul>
			{#each screenings._embedded.events as screening}
				<a href={`/${screening.productionHint?.title}`}>
					<li>
						<div class="time-info">
							Starts at: {formatDateTime(screening.startDate)} - Ends at: {formatDateTime(
								screening.endDate
							)}
						</div>

						{screening.productionHint.title}
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
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.date-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0;
		gap: 2rem;
	}

	.date-navigation button {
		padding: 0.5rem 1rem;
		border: 1px solid red;
	}

	a {
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
	}

	li {
		border-radius: 0.5rem;
		border: 1px solid red;
		padding: 1rem;
		width: 100%;
	}

	.time-info {
		font-size: 0.8rem;
		color: black;
	}
</style>
