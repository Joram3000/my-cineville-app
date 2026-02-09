import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	try {
		// Fetch film details from API
		const response = await fetch(`https://api.cineville.nl/films/${slug}`); // aanpassen naar juiste endpoint
		const film = await response.json();

		return {
			slug,
			film
		};
	} catch (error) {
		console.error('Failed to fetch film:', error);
		return {
			slug,
			film: null,
			error: 'Failed to load film details'
		};
	}
};
