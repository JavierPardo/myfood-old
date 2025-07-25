// export const URL_BASE = 'http://aqueous-aileron-281300.appspot.com/api/';
// export const URL_BASE = 'https://api-dot-aqueous-aileron-281300.appspot.com/api/';
export const URL_BASE = 'https://dev-api.myfoodapp.com.bo/api/';

export const APP_USERS_CURRENT_USER      = 'appusers/mobileuserprofile';
export const APP_USERS_LOGIN             = 'appusers/login';
export const APP_USERS_REGISTER          = 'appusers/register';
export const APP_USERS_UPDATE            = 'appusers/';
export const APP_USERS_CHANGE_PASSWORD   = 'appusers/changepassword';
export const APP_USERS_LOGIN_FACEBOOK    = 'socialaccount/facebook-login';
export const APP_USERS_RECOVERY_PASSWORD = 'appusers/recoverpassword';

export const BUSINESS_LIST             = (eventTypes, criteria) => `branch/search?eventtypes=${eventTypes}&criteria=${criteria}`;
export const BUSINESS_GET_ITEMS        = (businessId) => `item/getbybranchid/${businessId}`;
export const BUSINESS_GET_ITEM         = (itemId) => `item/${itemId}`;
export const BUSINESS_GET_ITEM_OPTIONS = (itemId) => `option/item/${itemId}`;
export const BUSINESS_GET_SIDES        = 'side';

export const EVENT_CREATE             = 'event';
export const EVENT_CREATE_ORDER       = 'order/event';
export const EVENT_CREATE_RESERVATION = 'reservation';

export const LOCATION_SAVE   = 'location';
export const LOCATION_LIST   = 'location/getbyuserid/';
export const LOCATION_DELETE = (locationId) => 'location/' + locationId;

