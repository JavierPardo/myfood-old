const cities = [
	{
		id      : 1,
		label   : 'Santa Cruz',
		center  : {latitude: -17.784441, longitude: -63.179025},
		distance: 100
	},
	{
		id      : 2,
		label   : 'La Paz',
		center  : {latitude: -16.4838497, longitude: -68.1240396},
		distance: 7
	},
	{
		id      : 3,
		label   : 'El Alto',
		center  : {latitude: -16.492572, longitude: -68.207174},
		distance: 7
	},
	{
		id      : 4,
		label   : 'Cochabamba',
		center  : {latitude: -17.404461, longitude: -66.164991},
		distance: 40
	},
	{
		id      : 5,
		label   : 'Sucre',
		center  : {latitude: -19.051973, longitude: -65.257161},
		distance: 20
	},
	{
		id      : 6,
		label   : 'Tarija',
		center  : {latitude: -21.524153, longitude: -64.730132},
		distance: 20
	},
	{
		id      : 7,
		label   : 'Potosi',
		center  : {latitude: -19.623181, longitude: -65.787689},
		distance: 50
	},
	{
		id      : 8,
		label   : 'Oruro',
		center  : {latitude: -17.982015, longitude: -67.093770},
		distance: 30
	},
	{
		id      : 9,
		label   : 'Beni',
		center  : {latitude: -14.856229, longitude: -64.896307},
		distance: 100
	},
	{
		id      : 10,
		label   : 'Pando',
		center  : {latitude: -11.197047, longitude: -68.584752},
		distance: 70
	}
];

const haversineDistance = (coords1, coords2) => {
	function toRad(x) {
		return x * Math.PI / 180;
	}
	
	const {lat1, lon1} = coords1;
	const {lat2, lon2} = coords2;
	const R            = 6371; // km
	const x1           = lat2 - lat1;
	const dLat         = toRad(x1);
	const x2           = lon2 - lon1;
	const dLon         = toRad(x2);
	const a            = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
											 Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
											 Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c            = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
};

const getCity = (coords) => {
	let distance = 0;
	let city     = 0;
	for (let i = 0; i < cities.length; i++) {
		const tempCity     = cities[i];
		const tempDistance = haversineDistance(tempCity.center, coords);
		if (tempDistance < tempCity.distance) {
			// city found, returning city
			return tempCity;
		}
		if (tempDistance <= distance || distance === 0) {
			//city not found , saving the closest city
			distance = tempDistance;
			city     = tempCity;
		}
	}
	return city;
};

export default getCity;
