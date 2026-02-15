<script lang="ts">
	import type { Event } from '$lib/types/types';
	import { formatDateTime } from '$lib/utils';
	export let screening: Event;

	$: imgSrc =
		screening._embedded.production?.assets.cover?.url ??
		screening._embedded.production?.assets.poster?.url ??
		undefined;
</script>

<a href={`/v2/events/${screening.id}`}>
	<div class="container">
		{#if imgSrc}
			<img
				src={imgSrc}
				alt={`${screening._embedded.production?.title ?? screening.productionHint.title} poster`}
				width="100"
			/>
		{/if}
		<div class="content">
			<h2>{screening._embedded.production?.title ?? screening.productionHint.title}</h2>

			<div class="time-info">
				Starts at: {formatDateTime(screening.startDate)}
			</div>
		</div>
	</div>
</a>

<style>
	.container {
		overflow: hidden;
		border: 1px solid red;
		border-radius: 0.5rem;
		width: 400px;
		flex-direction: column;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
		max-width: 400px;
	}

	img {
		width: 100%;
		height: auto;
	}

	.content {
		padding: 0.5rem;
	}

	h2 {
		font-size: 2rem;
		margin: 0.5rem 0;
	}

	.time-info {
		font-size: 0.8rem;
		color: black;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:hover .container {
		border: 1px solid rgb(143, 0, 0);
		scale: 1.01;
	}

	@media (max-width: 600px) {
		.container {
			flex: 1;
		}
	}
</style>
