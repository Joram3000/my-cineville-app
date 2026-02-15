<script lang="ts">
	import Search from './Search.svelte';
</script>

<header>
	<div class="nav-links">
		<a href="/">Home</a>
		<a href="/v2">V2</a>
		<a href="/retrospective">Retrospective</a>
		<a href="https://github.com/Joram3000/my-cineville-app">Github repo here</a>
	</div>
	<Search />
</header>

<style>
	header {
		display: flex;
		justify-content: space-evenly;
		border: 1px solid red;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		flex-direction: row;
		gap: 1rem;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
		width: 100%;
		justify-content: space-evenly;
	}
	a:hover {
		color: var(--color-theme-1);
	}

	@media (max-width: 600px) {
		header {
			flex-direction: column;
		}
	}
</style>
