import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from "redux";
import businessReducer from "./businessReducer";
import cartReducer from "./cartReducer";
import entitiesReducers from "./entities";
import api from "./middleware/api";
import uiReducers from "./ui";

const reducers = combineReducers({
	entities: entitiesReducers,
	ui      : uiReducers,
	business: businessReducer,
	cart    : cartReducer,
});

export default () => {
	return configureStore({
		reducer   : reducers,
		middleware: [...getDefaultMiddleware(), api]
	});
};
