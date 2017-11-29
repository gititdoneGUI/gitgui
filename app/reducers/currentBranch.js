import { getCurrentBranch } from '../actions/currentBranch';
var nodegit = require('nodegit');


export const currentBranch = (path) => (dispatch)=>{   

  nodegit.Repository.open(path)
    .then(function(repo) { 
      return repo.getCurrentBranch();} )
    .then(function(reference) {
      const ref=reference.toString();
      const currentBranch= ref.slice(ref.lastIndexOf('/')+1);
      console.log("im here")
      dispatch(getCurrentBranch(currentBranch));
      console.log('Currentbranch:' ,currentBranch);
    });
};

export default function(state = '', action) {
  switch (action.type) {
  case 'GET_CURRENT_BRANCH':
    return action.branch;

  default:
    return state;
  }
}