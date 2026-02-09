<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: screenings = data.screenings;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Cineville Film Schedule overview page</h1>
	<p>Schedule overview</p>

	<p>
		Creat e a small websit e where o ur members can explore t he fi lm sched ule in order t o find a
		fi lm screening t o att end. Make sure t hey can expl ore t he screenings by day of t he week
		and search for a specific fi lm. Requ iremen ts The websi t e sho uld have at least two dist inc
		t pages: Fi lm sched ule overview page where sched ule. t he user can expl ore t he fi lm Fi lm
		screening de tai l page where specific screening. t he user can view de tai ls abo ut t hat
	</p>

	<p>Search for a film screening by day of the week and search for a movie</p>
	<p>find screenings per day, and f9</p>
	<p>
		Users sho uld at least be able t o expl ore t he sched ule in t he fo ll owing ways: Find
		screenings per day, wi t h opt ions from t oday f uture. u n t i l 7 days in t o t he Find
		screenings for a specific fi lm by searching for (part of) t he fi lm's t i tle.
	</p>

	<form method="GET">
		<input name="q" value={data.q || ''} placeholder="Search film..." />
		<button type="submit">Search</button>
	</form>

	{#if screenings}
		<ul>
			{#each screenings as screening}
				<li>{screening.title} - {screening.date}</li>
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
</style>
