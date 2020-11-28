import { writable } from "svelte/store";

const cache = new Map();

export function getData2(url) {
	const store = writable(new Promise(() => {}));
	if (cache.has(url)) {
		store.set(Promise.resolve(cache.get(url)));
	}

	const load = async () => {
		const response = await fetch(url);
		const items = await response.json();

		let dates = [];
		let totals = [];
		let data = [];

		for (const [key, value] of Object.entries(items.timeline.cases)) {
			dates.push(new Date(key));
			totals.push(value);
		}

		let news = totals.slice(1).map((v, i) => v - totals[i]);
		totals = totals.slice(1);
		news = news;
		dates = dates.slice(1);
		let totalCases = totals[totals.length - 1];
		let lastReportCases = news[news.length - 1];
		let lastReport = dates[dates.length - 1];
		let firstReport = dates[0];
		let country = items.country;
		let reports = totals.length;

		let total = [];
		let newd = [];
		total = dates.map(function (x, i) {
			return {
				total: totals[i],
				date: x,
			};
		});
		newd = dates.map(function (x, i) {
			return {
				new: news[i],
				date: x,
			};
		});

		data = {
			info: {
				country,
				firstReport,
				lastReport,
				lastReportCases,
				totalCases,
				reports,
			},
			data: {
				total,
				new: newd,
			},
		};

		// console.log(data);
		cache.set(url, data);
		store.set(Promise.resolve(data));
	};
	load();
	return store;
}
