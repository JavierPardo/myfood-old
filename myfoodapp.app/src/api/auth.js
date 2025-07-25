import {APP_USERS_CURRENT_USER, APP_USERS_LOGIN, APP_USERS_LOGIN_FACEBOOK, APP_USERS_REGISTER} from "../utils/urls";
import apiClient from "./client";

const userLogin         = (user) => apiClient.post(APP_USERS_LOGIN, user);
const userRegister      = (user) => apiClient.post(APP_USERS_REGISTER, user);
const userGetCurrent    = () => apiClient.get(APP_USERS_CURRENT_USER);
export const userLoginFacebook = (facebookUser) => apiClient.post(APP_USERS_LOGIN_FACEBOOK, facebookUser);

export default {
	userLogin,
	userRegister,
	userGetCurrent,
	userLoginFacebook
};
