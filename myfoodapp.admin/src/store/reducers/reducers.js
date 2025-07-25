import { combineReducers } from 'redux';

import applicationReducer from './application.reducer.jsx';
import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import userPreferenceReducer from './userPreference.reducer.jsx';

export default combineReducers({
  settings: settingsReducer,
  theme: themesReducer,
  application: applicationReducer,
  userPreference: userPreferenceReducer,
});
