const prompt = require('electron-prompt');

const ADD_BRANCH = 'ADD_BRANCH';
const DELETE_BRANCH = 'DELETE_BRANCH';
const GET_BRANCH = 'GET_BRANCH'; 

export const addBranch = branch =>  ({type: ADD_BRANCH, branch});
export const deleteBranch = branch =>  ({type: DELETE_BRANCH, branch});
export const getBranch = branch => ({type: GET_BRANCH, branch});


export const openDialogBox = () => {prompt ({
  title: 'Prompt example',
  label: 'URL:',
  value: 'http://example.org',
  inputAttrs: { // attrs to be set if using 'input'
    type: 'url'
  },
  type: 'input', // 'select' or 'input, defaults to 'input'
  // selectOptions: { // select options if using 'select' type
  //     'value 1': 'Display Option 1',
  //     'value 2': 'Display Option 2',
  //     'value 3': 'Display Option 3'
  // }
})
  .then((r) => {
    console.log('result', r); // null if window was closed, or user clicked Cancel
  })
  .catch(console.error);
    
};

export const checkoutBranch = (path, branchName, startPoint) => (dispatch) => {
  require('simple-git')(`${path}`).checkoutBranch(branchName, startPoint);
  dispatch(addBranch(branchName)); 
};

export const checkoutLocalBranch = (path, branchName) => (dispatch) => {
  require('simple-git')(`${path}`).checkoutBranch(branchName);
  dispatch(addBranch(branchName)); 
};

export const deleteLocalBranch = (path, branchName) => (dispatch) => {
  require('simple-git')(`${path}`).deleteLocalBranch(branchName);
  dispatch(deleteBranch(branchName));
};

export const checkout = (path, checkoutWhat) => {
  require('simple-git')(`${path}`).checkout(checkoutWhat);
};


export default function reducer (state = [], action){
  switch (action.type){
  case ADD_BRANCH:
    return [...state, action.branch];
  case DELETE_BRANCH: 
    return [...state].filter(item => item !== action.branch);
  case GET_BRANCH:
    return action.branch;
  default:
    return state;
  }
}
