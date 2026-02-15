<script lang="ts">
	import type { PageData } from './$types';
	import type { Event } from '$lib/types/types';
	import { formatDate, formatTime } from '$lib/utils';

	export let data: PageData;

	$: event = data.event as Event | null;

	$: imageUrl = event?._embedded?.production?.assets.poster?.url
		? event._embedded.production.assets.poster.url
		: event?._embedded.venue?.assets.cover?.url;
</script>

<section>
	{#if event}
		<h1>Film title {event._embedded.production?.title}</h1>

		{#if imageUrl}
			<img src={imageUrl} alt="Film poster {event._embedded.production?.title}" />
		{/if}
		<p><span class="attribute">Cinema name</span> {event?._embedded?.venue?.name}</p>

		<p><span class="attribute">Day of the screening</span> {formatDate(event.startDate)}</p>
		<p><span class="attribute">Time of the screening</span> {formatTime(event.startDate)}</p>
		<p>
			<span class="attribute">Subtitles</span>
			{event.attributes.subtitles?.length === 0
				? 'Unknown'
				: event.attributes.subtitles?.join(', ')}
		</p>
		<p>
			<span class="attribute">Cinema address</span>
			{event?._embedded?.venue?.address.city}, {event?._embedded?.venue?.address.street}
			{event?._embedded?.venue?.address.houseNumber}
		</p>

		{#if event._embedded.production?.attributes.cast}<p>
				<span class="attribute">Cast</span>
				{event._embedded.production?.attributes.cast?.join(', ')}
			</p>{/if}
		{#if event._embedded.production?.attributes.directors}<p>
				<span class="attribute">Directors</span>
				{event._embedded.production?.attributes.directors?.join(', ')}
			</p>{/if}

		{#if event._embedded.production?.attributes.releaseYear}<p>
				<span class="attribute">Release year</span>
				{event._embedded.production?.attributes.releaseYear}
			</p>{/if}

		<p>
			<span class="attribute">Spoken language</span>
			{event._embedded.production?.attributes.spokenLanguages?.join(', ')}
		</p>
	{:else}
		<p>No event details available.</p>
	{/if}
</section>

<style>
	section {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	p {
		margin: 0.5rem 0;
	}

	.attribute {
		font-weight: bold;
	}
</style>
