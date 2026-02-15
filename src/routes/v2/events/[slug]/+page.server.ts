import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	try {
		const response = await fetch(
			`https://api.cineville.nl/events/${encodeURIComponent(slug)}?embed[production]=true&embed[venue]=true`
		);

		if (!response.ok) {
			throw new Error(`API error ${response.status}`);
		}

		const event = await response.json();

		return {
			slug: slug,
			event
		};
	} catch (error) {
		console.error('Failed to fetch event:', error);
		return {
			slug: slug,
			event: null,
			error: 'Failed to load event details'
		};
	}
};
