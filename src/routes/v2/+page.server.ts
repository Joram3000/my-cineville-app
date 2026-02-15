import type { EventList } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const dateParam = url.searchParams.get('date');
	const q = url.searchParams.get('q')?.trim() ?? '';

	const selectedDate = dateParam ? new Date(dateParam) : new Date();

	if (Number.isNaN(selectedDate.getTime())) {
		throw new Error('Invalid date parameter');
	}

	const events = await fetchEvents(fetch, selectedDate);
	return {
		screenings: events,
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
