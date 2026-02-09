import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	try {
		// Fetch event details from API
		const response = await fetch(
			`https://api.cineville.nl/events/${slug}?embed[production]=true&embed[venue]=true`
		); // geeft 1 single event terug
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
