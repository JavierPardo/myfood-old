import {AsyncStorage} from "react-native";

const USER_TOKEN_INDEX = 'userToken';
const COUNTRY_ID_INDEX = 'countryId';
const CITY_ID_INDEX    = 'cityId';

export const getUserToken    = async () => await AsyncStorage.getItem(USER_TOKEN_INDEX);
export const saveUserToken   = async (token) => await AsyncStorage.setItem(USER_TOKEN_INDEX, token, () => console.log('token saved'));
export const removeUserToken = async () => await AsyncStorage.removeItem(USER_TOKEN_INDEX, () => console.log('token removed'));

export const getCountryId    = async () => await AsyncStorage.getItem(COUNTRY_ID_INDEX);
export const saveCountryId   = async (token) => await AsyncStorage.setItem(COUNTRY_ID_INDEX, token, () => console.log('country id saved'));
export const removeCountryId = async () => await AsyncStorage.removeItem(COUNTRY_ID_INDEX, () => console.log('country id removed'));

export const getCityId    = async () => await AsyncStorage.getItem(CITY_ID_INDEX);
export const saveCityId   = async (token) => await AsyncStorage.setItem(CITY_ID_INDEX, token, () => console.log('city id saved'));
export const removeCityId = async () => await AsyncStorage.removeItem(CITY_ID_INDEX, () => console.log('city id removed'));
