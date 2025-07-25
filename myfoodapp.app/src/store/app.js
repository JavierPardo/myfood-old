import {combineReducers} from "redux";
import appStatusReducer from "./appStatusReducer";

const appReducers = combineReducers({
	appStatus: appStatusReducer,
});
export default appReducers;
