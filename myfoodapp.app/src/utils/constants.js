export const API_KEY = "AIzaSyBf74qANKcSq0n3JzWluIfRytrTyMrAG_U";

export const DEFAULT_CENTER = {latitude: -17.783819, longitude: -63.181491, default: true};

export const FACEBOOK_APP_ID = '914651292277191';

export const TYPE_PICKUP            = {
	code : 'GE',
	title: 'Tu pedido para recoger',
};
export const TYPE_DELIVERY          = {
	code : 'GI',
	title: 'Tu pedido para llevar',
};
export const TYPE_RESERVATION       = {
	code : 'GQ',
	title: 'Has tu reserva',
};
export const TYPE_VIRTUAL_ASSISTANT = {
	code : 'GM',
	title: 'Solicita tu camarero vitual',
};

export const LOCATION_TYPE_HOME   = "HOME";
export const LOCATION_TYPE_WORK   = "WORK";
export const LOCATION_TYPE_MARKET = "MARKET";
export const LOCATION_TYPE_OTHER  = "OTHER";
export const LOCATION_TYPES       = {
	[LOCATION_TYPE_HOME]  : {label: 'Casa', icon: 'home'},
	[LOCATION_TYPE_WORK]  : {label: 'Trabajo', icon: 'briefcase'},
	[LOCATION_TYPE_MARKET]: {label: 'Mercado', icon: 'shopping-cart'},
	[LOCATION_TYPE_OTHER] : {label: 'Otro', icon: 'star'}
};
