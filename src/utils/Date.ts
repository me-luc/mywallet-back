export function getNowDate() {
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	return (
		dd.toString().padStart(2, '0') +
		'/' +
		mm.toString().padStart(2, '0') +
		'/' +
		yyyy
	);
}
