import {combineReducers} from "redux";
import businessReducer from "./businessReducer";
import userReducer from "./userReducer";

const entitiesReducers = combineReducers({
	user      : userReducer,
});
export default entitiesReducers;
