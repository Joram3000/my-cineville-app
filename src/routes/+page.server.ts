import type { EventList } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const dateParam = url.searchParams.get('date');
	const q = url.searchParams.get('q');

	// if no date provided, use today
	const today = dateParam ? new Date(dateParam) : new Date();

	// fetch screenings for the given date
	const screenings = await fetchScreenings(fetch, today, q);

	return {
		today: today.toISOString(),
		screenings,
		q
	};
};

async function fetchScreenings(fetch: typeof globalThis.fetch, date: Date, query?: string | null) {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	const response = await fetch(
		`https://api.cineville.nl//events?startDate[gte]=${startOfDay.toISOString()}&startDate[lt]=${endOfDay.toISOString()}`
	);

	const screenings: EventList = await response.json();

	return screenings;
}
