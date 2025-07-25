import {create} from 'apisauce';
import axios from 'axios';
import {getUserToken} from '../../utils/storage';
import {URL_BASE} from '../../utils/urls';
import {apiCallBegin} from '../api';
import {requestFail, requestStart, requestSuccess} from '../appStatusReducer';

const api2 = (store) => (next) => async (action) => {
	if (action.type !== apiCallBegin.type) return next(action);
	next(action);
	const {url, method, data, headers, onStart, onSuccess, onError} = action.payload;
	
	store.dispatch(requestStart());
	if (onStart) store.dispatch({type: onStart});
	
	try {
		const token    = await getUserToken();
		const response = await axios.request({
			baseURL: URL_BASE,
			method,
			data,
			url,
			headers: token ? {Authorization: 'Bearer ' + token} : {},
		});
		
		store.dispatch(requestSuccess(response.data));
		if (onSuccess) store.dispatch({type: onSuccess, payload: response.data});
	} catch (error) {
		
		store.dispatch(requestFail(error.response.data));
		if (onError) store.dispatch({type: onError, payload: error.response.data});
		console.log(onError);
		// if (error.response) {
		// 	/*
		// 	 * The request was made and the server responded with a
		// 	 * status code that falls out of the range of 2xx
		// 	 */
		// 	console.log("-----------ERROR.RESPONSE----------");
		// 	console.log(error.response.data);
		// 	console.log(error.response.status);
		// 	console.log(error.response.headers);
		// } else if (error.request) {
		// 	/*
		// 	 * The request was made but no response was received, `error.request`
		// 	 * is an instance of XMLHttpRequest in the browser and an instance
		// 	 * of http.ClientRequest in Node.js
		// 	 */
		// 	console.log("-----------ERROR.REQUEST----------");
		// 	console.log(error.request);
		// } else {
		// 	// Something happened in setting up the request and triggered an Error
		// 	console.log("-----------ERROR.MESSAGE----------");
		// 	console.log("Error", error.message);
		// }
		// console.log("-----------ERROR.CONFIG----------");
		// console.log(error.config);
	}
};

const getRequest = async () => {
	const token   = await getUserToken();
	const request = create({baseURL: URL_BASE});
	if (token) request.setHeader('Authorization', 'Bearer ' + token);
	return request;
};

const api = (store) => (next) => async (action) => {
	
	const request = await getRequest();
	
	if (action.type !== apiCallBegin.type) return next(action);
	next(action);
	const {url, method, params, data, headers, onStart, onSuccess, onError} = action.payload;
	
	store.dispatch(requestStart());
	if (onStart) store.dispatch({type: onStart});
	
	const response = await request.any({
			method,
			url,
			data,
		},
	);
	
	
	// console.log("RESPONSE", response);
	
	if (response.ok) {
		store.dispatch(requestSuccess(response.data));
		if (onSuccess) store.dispatch({type: onSuccess, payload: response.data});
	} else {
		let errorState = {};
		switch (response.status) {
			case 401: {
				errorState = "Unauthorized";
				break;
			}
		}
		store.dispatch(requestFail(errorState));
		if (onError) store.dispatch({type: onError, payload: errorState});
	}
};


export default api;
