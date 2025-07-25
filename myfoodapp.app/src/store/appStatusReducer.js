import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_CENTER} from "../utils/constants";

const slice    = createSlice(
	{
		name        : 'appStatus',
		initialState: {
			loading            : false,
			message            : '',
			userCurrentLocation: DEFAULT_CENTER,
		},
		reducers    : {
			requestStart      : (state, action) => {
				state.loading = true;
			},
			requestSuccess    : (state, action) => {
				state.loading = false;
			},
			requestFail       : (state, action) => {
				state.loading = false;
			},
			setCurrentLocation: (state, action) => {
				state.userCurrentLocation = action.payload;
			}
		}
	}
);
export const {
							 requestStart,
							 requestSuccess,
							 requestFail,
							 setCurrentLocation,
						 } = slice.actions;
export default slice.reducer;
