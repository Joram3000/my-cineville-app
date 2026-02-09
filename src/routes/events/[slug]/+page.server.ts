import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	try {
		const response = await fetch(
			`https://api.cineville.nl/events/${slug}?embed[production]=true&embed[venue]=true`
		);
		const event = await response.json();

		return {
			slug,
			event
		};
	} catch (error) {
		console.error('Failed to fetch event:', error);
		return {
			slug,
			event: null,
			error: 'Failed to load event details'
		};
	}
};
