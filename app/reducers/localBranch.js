import { getLocalBranches } from '../actions/localBranch';

const {dialog} = require('electron').remote;

export const branch = (path) => (dispatch)=>{
  console.log("path", path);
  return  require('simple-git/promise')(`${path}`).branchLocal()
    .then((obj)=> {
      dispatch(getLocalBranches(obj['all']));
      console.log(' List of branches Successfully Completed ', obj['all']);}
    )
    .catch((err) => openDialogBox(err) ); 
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}


//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case 'GET_LOCAL_BRANCHES':
      return action.branches;

    default:
      return state;
  }
}