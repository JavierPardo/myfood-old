import {
    EVENT_CREATE, EVENT_CREATE_ORDER, EVENT_CREATE_RESERVATION, EVENT_GET_ITEM, EVENT_GET_ITEM_OPTIONS
}                from "../utils/urls";
import apiClient from "./client";

export const eventCreate            = (branchId, data) => apiClient.post(EVENT_CREATE, data, {headers: {branchId: branchId}});
export const eventOrderCreate       = data => apiClient.post(EVENT_CREATE_ORDER, data);
export const eventReservationCreate = data => apiClient.post(EVENT_CREATE_RESERVATION, data);

export default {
    eventCreate, eventOrderCreate
};
