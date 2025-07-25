import {
  REMOVE_SPINNER,
  ADD_SPINNER,
  TOGGLE_RELOAD_CLIENT,
  TOGGLE_RELOAD_BRANCH,
} from '../actions/applications.actions';

const initialState = {
  spinnerQueue: [],
  reloadClients: false,
  reloadBranches: false,
};

export default (
  state = initialState,
  { type, payload: { message, ...payload } = {} }
) => {
  switch (type) {
    case TOGGLE_RELOAD_CLIENT:
      state.reloadClients = !state.reloadClients;
      return { ...state };
    case TOGGLE_RELOAD_BRANCH:
      state.reloadBranches = !state.reloadBranches;
      return { ...state };
    case REMOVE_SPINNER:
      state.spinnerQueue = state.spinnerQueue.filter(function ({ id }) {
        return id !== payload.name;
      });
      return { ...state };

    case ADD_SPINNER:
      state.spinnerQueue = [
        { id: payload.name, message },
        ...state.spinnerQueue,
      ];
      return { ...state };

    default:
      return state;
  }
};
