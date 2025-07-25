export const ADD_SPINNER = 'ADD_SPINNER';
export const REMOVE_SPINNER = 'REMOVE_SPINNER';
export const TOGGLE_RELOAD_CLIENT = 'TOGGLE_RELOAD_CLIENT';
export const TOGGLE_RELOAD_BRANCH = 'TOGGLE_RELOAD_BRANCH';

/**
 * Change a setting value
 * payload.name: name of the setting prop to change
 * payload.value: new value to apply
 */
export function addSpinner(name, message) {
  return { type: ADD_SPINNER, payload: { name, message } };
}

export function toggleReloadClients() {
  return { type: TOGGLE_RELOAD_CLIENT };
}

export function toggleRealoadBranches() {
  return { type: TOGGLE_RELOAD_BRANCH };
}

/**
 * Toggle a setting value (only boolean)
 */
export function removeSpinner(name) {
  return { type: REMOVE_SPINNER, payload: { name } };
}
