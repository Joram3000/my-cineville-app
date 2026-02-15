<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../lib/components/Header.svelte';

	let { children } = $props();
	let outlineEnabled = true;
	onMount(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.shiftKey && e.key.toLowerCase() === 'o') {
				e.preventDefault();
				outlineEnabled = !outlineEnabled;

				if (outlineEnabled) {
					document.body.classList.remove('outline-enabled');
				} else {
					document.body.classList.add('outline-enabled');
				}
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
