<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: slug = data.slug;
</script>

<section>
	<h1>Film details page</h1>
	<p>Slug: {slug}</p>
</section>
