<script lang="ts">
	import { goto } from '$app/navigation';
	let query = '';

	function searchMovies(query: string) {
		goto(`/v2/search/?q=${encodeURIComponent(query)}`);
	}
</script>

<form on:submit|preventDefault={() => searchMovies(query)}>
	<input bind:value={query} />
	<button disabled={query === ''} type="button" on:click={() => (query = '')}>x</button>
	<button type="submit">Search</button>
</form>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		align-items: flex-end;
		justify-content: flex-end;
		width: fit-content;
		border: 1px solid orange;
	}
</style>
