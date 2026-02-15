import type { EventList } from '$lib/types/types';
import { endOfDay, startOfDay } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const dateParam = url.searchParams.get('date');
	const selectedDate = dateParam ? new Date(dateParam) : new Date();

	if (Number.isNaN(selectedDate.getTime())) {
		throw new Error('Invalid date parameter');
	}

	const events = await fetchEvents(fetch, selectedDate);
	return {
		screenings: events
	};
};

async function fetchEvents(fetchFn: typeof fetch, date: Date): Promise<EventList> {
	const startOfDayTime = startOfDay(date);
	const endOfDayTime = endOfDay(date);

	const response = await fetchFn(
		`https://api.cineville.nl/events?startDate[gte]=${startOfDayTime.toISOString()}&startDate[lt]=${endOfDayTime.toISOString()}&embed[production]=true`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as EventList;
}
