
const {dialog} = require('electron').remote;


//ACTION TYPES
const GET_REMOTE_BRANCHES = 'GET_REMOTE_BRANCHES';


//ACTION CREATORS
export const getRemoteBranches = branches => ({ type: GET_REMOTE_BRANCHES, branches });



export const getAllRemoteBranches = (path) => (dispatch)=>{

  return  require('simple-git/promise')(`${path}`).branch()
    .then((obj)=> {
      const remotes= obj['all'].filter(ele=> ele.slice(0,7) == 'remotes' );
      const pruned = remotes.map(ele => {
        return ele.slice(8);
      });
      // console.log('remotes', remotes);
      // console.log('pruned', pruned);
      dispatch(getRemoteBranches(pruned));
      console.log(' List of Remote branches Successfully Completed ', pruned);}
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
  case 'GET_REMOTE_BRANCHES':
    return action.branches;
  default:
    return state;
  }
}
