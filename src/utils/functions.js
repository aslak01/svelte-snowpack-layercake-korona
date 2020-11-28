// https://stackoverflow.com/questions/60211628/moving-average-of-time-series-objects-in-array
export function computeMovingAverage(data, period, datekey, valuekey, avgkey) {
	const movingAverages = [];
	
	const sortDates = (data) => data.sort((a, b) => new Date(a[datekey]) - new Date (b[datekey]));
	const sortedData = sortDates(data);
	
	const getAverage = (data, valuekey) => data.reduce((acc, val) => acc + val[valuekey], 0) / data.length;
	for (let x = 0; x + period - 1 < sortedData.length; x += 1) {
		let row = {}
		if (Array.isArray(valuekey)) {
			for (let i = 0; i < valuekey.length; i += 1) {
				row[valuekey[i]] = Math.round( getAverage( sortedData.slice(x, x + period), valuekey[i]) )
			}
		} else { 
			row[avgkey] = Math.round( getAverage( sortedData.slice(x, x + period), valuekey) )	
		}
		row[datekey] = (period > 1) ? sortedData.slice(x, x + period)[Math.round(period/2)][datekey] : sortedData.slice(x, x + period)[0][datekey]			
		movingAverages.push(row)
	}
	return movingAverages;
}


export function cutData(data, start, end) {
	let firstSlice = Math.round(start * data.length)
	let lastSlice = Math.round(end* data.length)
	if (lastSlice-firstSlice>=2) {
		return data.slice(firstSlice, lastSlice)
	} else if (lastSlice < 2) {
		return data.slice(firstSlice, lastSlice+2)
	} else if (firstSlice-data.length < 1) {
		return data.slice(firstSlice-2, lastSlice)
	}
}


// uniqueByKeepLast(data, itm => itm.key)
// https://levelup.gitconnected.com/7-ways-to-remove-duplicates-from-array-in-javascript-cea4144caf31
export function uniqueByKeepLast(data, key) {
	return [
		new Map(
			data.map(x => [key(x), x])
		).values()
	]
}

export function norskTall(tall) {
	return new Intl.NumberFormat("no-NO").format(tall)
}