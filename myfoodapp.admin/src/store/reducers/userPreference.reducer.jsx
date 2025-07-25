import { userActions } from '../actions/user.actions';

const initialState = {
  branchId: localStorage.getItem('branch'),
  clientId: localStorage.getItem('client'),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case userActions.changeClient:
      localStorage.setItem('client', payload.clientId);
      return { ...state, ...payload };
    case userActions.changeBranch:
      localStorage.setItem('branch', payload.branchId);
      return { ...state, ...payload };

    default:
      return state;
  }
};
