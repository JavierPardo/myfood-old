import {createAction} from "@reduxjs/toolkit";

export const apiCallBegin   = createAction('API_CALL_BEGIN');
export const apiCallSuccess = createAction('API_CALL_SUCCESS');
export const apiCallFail    = createAction('API_CALL_FAIL');