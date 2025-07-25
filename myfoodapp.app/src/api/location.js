import {LOCATION_DELETE, LOCATION_LIST, LOCATION_SAVE} from "../utils/urls";
import apiClient from "./client";

export const locationList   = () => apiClient.get(LOCATION_LIST);
export const locationAdd    = location => apiClient.post(LOCATION_SAVE, location);
export const locationDelete = locationId => apiClient.delete(LOCATION_DELETE(locationId));

export default {
	locationAdd,
	locationDelete,
	locationList,
};
