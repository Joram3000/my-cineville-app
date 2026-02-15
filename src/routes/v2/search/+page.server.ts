import type { EventList } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const q = url.searchParams.get('q')?.trim() || '';
	const searchResults = q ? await searchProductions(fetch, q) : null;

	return {
		searchResults,
		query: q
	};
};

async function searchProductions(fetchFn: typeof fetch, query: string): Promise<EventList> {
	const response = await fetchFn(
		`https://api.cineville.nl/events?production[title][contains]=${encodeURIComponent(query)}&embed[production]=true`
	);

	if (!response.ok) {
		throw new Error(`Failed to search productions: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as EventList;
}
