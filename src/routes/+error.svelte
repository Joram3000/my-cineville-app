<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => {
		goto('/v2', { replaceState: true });
	});
</script>

<svelte:head>
	<title>'No event or movie found'</title>
</svelte:head>

<section>
	<div class="inner">
		<h1>Oops</h1>
		<p>This movie/event doesn't exist!</p>
		<p>You will be redirected to the home page</p>
	</div>
</section>

<style>
	section {
		background-color: var(--brown);
		height: 100%;
		display: flex;
		justify-content: center;
		flex: 1;
		padding-block-end: var(--padding-block);
		align-items: center;
	}

	h1,
	p {
		text-align: center;
		width: 100%;
		padding: 1rem;
	}

	.inner {
		width: 100%;
	}

	@media (min-width: 768px) {
		.inner {
			margin: var(--header-height) auto 0;
		}
	}
</style>
