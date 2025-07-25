import {createSlice} from "@reduxjs/toolkit";

const slice    = createSlice({
	name        : "user",
	initialState: {
		userData   : "",
		locations  : [],
		message    : '',
		closeScreen: false,
		refresh    : true,
	},
	reducers    : {
		setLocations  : (state, action) => {
			state.locations = action.payload;
			state.refresh   = false;
		},
		addLocations  : (state, action) => {
			state.locations.push(action.payload);
			state.message = "Ubicación guardada";
		},
		requestSuccess: (state, action) => {
			state.message = 'Ubicacion Guardada exitosamente';
			state.refresh = true;
		},
		requestFail   : (state, action) => {
			state.message = 'Surgio un error al guardar, intente nuevamente';
		},
		deleteSuccess : (state, action) => {
			// state.message     = 'Ubicacion eliminada exitosamente';
			state.closeScreen = true;
			state.refresh     = true;
		},
		deleteFail    : (state, action) => {
			state.message = 'Surgio un error al eliminar, intente nuevamente';
		},
		clearMessage  : (state, action) => {
			state.message     = '';
			state.closeScreen = false;
		}
	},
});
export const {
							 setLocations,
							 requestSuccess,
							 requestFail,
							 clearMessage,
							 deleteSuccess,
							 deleteFail
						 } = slice.actions;
export default slice.reducer;
