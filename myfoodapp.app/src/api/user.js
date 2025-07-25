import {APP_USERS_CHANGE_PASSWORD, APP_USERS_RECOVERY_PASSWORD, APP_USERS_UPDATE} from "../utils/urls";
import apiClient                                                                  from "./client";

export const userUpdate          = user => apiClient.put(APP_USERS_UPDATE, user);
export const userChangePassword  = data => apiClient.post(APP_USERS_CHANGE_PASSWORD, data);
export const userRecoverPassword = data => apiClient.post(APP_USERS_RECOVERY_PASSWORD, data);

export default {userUpdate, userChangePassword};
