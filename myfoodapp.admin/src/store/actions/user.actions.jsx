export const userActions = {
  changeClient: 'CHANGE_CLIENT',
  changeBranch: 'CHANGE_BRANCH',
};

export const changeClientAction = (clientId) => ({
  type: userActions.changeClient,
  payload: { clientId },
});
export const changeBranchAction = (branchId) => ({
  type: userActions.changeBranch,
  payload: { branchId },
});
