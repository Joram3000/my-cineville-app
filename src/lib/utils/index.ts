export function startOfDay(d: Date) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x;
}

export function formatDate(date: string | null) {
	if (!date) return '';

	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}

export function formatTime(date: string | null) {
	if (!date) return '';

	return new Date(date).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function formatDateTime(date: string | null) {
	if (!date) return '';

	return new Date(date).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
