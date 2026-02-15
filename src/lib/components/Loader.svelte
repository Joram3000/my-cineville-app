<script lang="ts">
</script>

<div class="container">
	<p>LOADING</p>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		aspect-ratio: 1/1;
	}

	p {
		font-size: 4rem;
		animation: spin 500ms linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
