import * as SecureStore from 'expo-secure-store';

const AUTH_KEY = 'AUTH_KEY';

const storeToken = async (authToken) => {
	try {
		await SecureStore.setItemAsync(AUTH_KEY, authToken);
	} catch (error) {
		console.log('Error storing auth token', error);
	}
};

const getToken = async () => {
	try {
		return await SecureStore.getItemAsync(AUTH_KEY);
	} catch (error) {
		console.log('Error getting auth token', error);
	}
};


const removeToken = async () => {
	try {
		await SecureStore.deleteItemAsync(AUTH_KEY);
	} catch (error) {
		console.log('Error deleting auth token', error);
	}
};

export default {
	getToken, storeToken, removeToken
};

