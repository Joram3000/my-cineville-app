import type { EventList } from '$lib/types/types';
import type { PageServerLoad } from './$types';





export const load: PageServerLoad = async ({ url, fetch }) => {
	const q = url.searchParams.get('q') || '';

	console.log('Fetching screenings...');
	console.log('Search query:', q);

	const response = await fetch(
		`https://api.cineville.nl//events?startDate[gte]=2026-01-28T08:00:00.000Z&startDate[lt]=2026-01-
29T00:00:00.000Z`
	);

	const screenings: EventList = await response.json();

	console.log('some result', screenings);

	return {
		screenings,
		q
	};
};
