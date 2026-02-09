import type { PageServerLoad } from './$types';

// GET /events/{id}
// Re
// turns a single even
// t wi
// t
// t
// h
// he given ID. See h
// ttps://api.cinevi
// lle.n
// service/api/#/Even
// ts/Even
// tsCon
// tro
// ller_ge
// t
// O
// ne.
// l/sched
// ule-
// This is a mu
// ch more straigh
// t
// forward endpoin
// usef
// ul t
// o embed t
// he relat
// ed prod
// u
// t
// c
// ion and ven
// t, alt
// ho
// u
// e.
// u
// gh here i
// t wi
// ll als

export const load: PageServerLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	try {
		// Fetch film details from API
		const response = await fetch(`https://api.cineville.nl/events/${slug}`); // geeft 1 single event terug
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
