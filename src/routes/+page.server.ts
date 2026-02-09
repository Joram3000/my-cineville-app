import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const q = url.searchParams.get('q') || '';

	console.log('Fetching screenings...');
	console.log('Search query:', q);

	const response = await fetch(`https://api.cineville.nl/productions/by-title/free`);
	const screenings = await response.json();

	console.log('some result', screenings);

	return {
		screenings,
		q
	};
};
