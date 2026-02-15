import type { EventList } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const dateParam = url.searchParams.get('date');
	const q = url.searchParams.get('q')?.trim() ?? '';

	const selectedDate = dateParam ? new Date(dateParam) : new Date();

	if (Number.isNaN(selectedDate.getTime())) {
		throw new Error('Invalid date parameter');
	}

	const screenings =
		q.length > 0 ? await searchProductions(fetch, q) : await fetchEvents(fetch, selectedDate);

	return {
		screenings,
		q
	};
};

async function fetchEvents(fetchFn: typeof fetch, date: Date): Promise<EventList> {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	const response = await fetchFn(
		`https://api.cineville.nl/events?startDate[gte]=${startOfDay.toISOString()}&startDate[lt]=${endOfDay.toISOString()}&embed[production]=true`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as EventList;
}

async function searchProductions(fetchFn: typeof fetch, query: string): Promise<EventList> {
	const response = await fetchFn(
		`https://api.cineville.nl/events?production[title][contains]=${encodeURIComponent(query)}&embed[production]=true`
	);

	if (!response.ok) {
		throw new Error(`Failed to search productions: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as EventList;
}
