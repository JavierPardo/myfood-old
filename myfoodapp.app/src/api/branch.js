import {
	BUSINESS_GET_ITEMS,
	BUSINESS_LIST,
	BUSINESS_GET_ITEM,
	BUSINESS_GET_ITEM_OPTIONS,
	BUSINESS_GET_SIDES
} from "../utils/urls";
import apiClient from "./client";

export const branchGetBusinesses = (eventType, query) => apiClient.get(BUSINESS_LIST(eventType, query));
export const branchGetItems      = (branchId) => apiClient.get(BUSINESS_GET_ITEMS(branchId));
export const branchGetItem        = itemId => apiClient.get(BUSINESS_GET_ITEM(itemId));
export const branchGetItemOptions = itemId => apiClient.get(BUSINESS_GET_ITEM_OPTIONS(itemId));
export const branchGetSides       = (branchId) => apiClient.get(BUSINESS_GET_SIDES, {}, {headers: {branchId: branchId}});