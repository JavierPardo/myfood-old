import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
	name        : "businesses",
	initialState: {
		searchQuery   : '',
		eventType     : '',
		businessPicked: false,
		foodPicked    : false,
	},
	reducers    : {
		setBusinessPicked: (state, action) => {
			state.searchQuery    = action.payload.searchQuery;
			state.businessPicked = action.payload.business;
			state.eventType      = action.payload.eventType;
		},
		setFoodPicked    : (state, action) => {
			state.foodPicked = action.payload;
		}
	},
});

export const {setBusinessPicked, setFoodPicked} = slice.actions;
export default slice.reducer;
