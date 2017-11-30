import { setCurrentBranch } from '../actions/currentBranch';
var nodegit = require('nodegit');

export const currentBranch = (path) => (dispatch) => {
  return nodegit.Repository.open(path)
    .then(function(repo) {
      return repo.getCurrentBranch();} )
    .then(function(reference) {
      const ref=reference.toString();
      const currentBranch= ref.slice(ref.lastIndexOf('/')+1);
      return dispatch(setCurrentBranch(currentBranch));
    });
};

export default function(state = '', action) {
  switch (action.type) {
  case 'SET_CURRENT_BRANCH':
    return action.branch;
  default:
    return state;
  }
}
