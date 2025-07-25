import { createStore, applyMiddleware } from 'redux';

import { persistedState, saveState } from './persisted.store.js';

import middlewares from './middlewares/middlewares';
import { updateTheme } from './middlewares/themes.middleware.js';
import reducers from './reducers/reducers';

export default function configureStore() {
  const store = createStore(
    reducers /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // add a listener that will be invoked on any state change
  store.subscribe(() => {
    saveState(store.getState());
  });

  // Update the initial theme
  updateTheme(store.getState());

  return store;
}
