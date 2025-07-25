import {combineReducers} from "redux";
import appStatusReducer from "./appStatusReducer";
// import experienceReducer from "./experienceReducer";

const uiReducers = combineReducers({
	app: appStatusReducer,
});
export default uiReducers;
