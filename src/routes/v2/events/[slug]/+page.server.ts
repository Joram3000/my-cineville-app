import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug; // dit is alleen de slug in /v2/[slug]
	const cleanedSlug = slug.replace(/^\/?v2\//, ''); // extra safety

	try {
		const response = await fetch(
			`https://api.cineville.nl/events/${encodeURIComponent(cleanedSlug)}?embed[production]=true&embed[venue]=true`
		);

		if (!response.ok) {
			throw new Error(`API error ${response.status}`);
		}

		const event = await response.json();

		return {
			slug: cleanedSlug,
			event
		};
	} catch (error) {
		console.error('Failed to fetch event:', error);
		return {
			slug: cleanedSlug,
			event: null,
			error: 'Failed to load event details'
		};
	}
};
