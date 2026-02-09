<script lang="ts">
	import type { PageData } from './$types';
	import type { Event } from '$lib/types/types';
	import { formatDate, formatTime } from '$lib/utils';

	export let data: PageData;

	$: event = data.event as Event | null;

	$: imageUrl = event?._embedded?.production?.assets.poster?.url
		? event._embedded.production.assets.poster.url
		: event._embedded.venue?.assets.cover?.url;
</script>

<section>
	{#if event}
		<h1>Film title {event.productionHint?.title}</h1>

		{#if imageUrl}
			<img src={imageUrl} alt="Film poster {event.productionHint?.title}" />
		{/if}

		<p>Day of the screening {formatDate(event.startDate)}</p>
		<p>Time of the screening {formatTime(event.startDate)}</p>
		<p>
			Subtitles {event.attributes.subtitles?.length === 0
				? 'None'
				: event.attributes.subtitles?.join(', ')}
		</p>
		<p>Cinema name: {event?._embedded?.venue?.name}</p>
		<p>
			Cinema address: {event?._embedded?.venue?.address.city}, {event?._embedded?.venue?.address
				.street}
			{event?._embedded?.venue?.address.houseNumber}
		</p>
		<p>Film still or poster</p>

		<p>Cast</p>
		<p>Director(s)</p>
		<p>Release year</p>
		<p>Spoken language</p>
	{:else}
		<p>No event details available.</p>
	{/if}
</section>

<style>
	section {
		padding: 1rem;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	img {
		max-width: 100%;
		height: auto;
	}
</style>
