<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: slug = data.slug;
</script>

<section>
	<h1>Screening details page</h1>
	<p>Slug: {slug}</p>

	<p>
		Day of the screeningTime of the screen intg Subtitles cinema name: adres Fi lm t i tle, st ll i
		or post er, cast, direc t or(s), release year, spo ken lang uage
	</p>
</section>
