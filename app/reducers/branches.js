const ADD_BRANCH = 'ADD_BRANCH';
const DELETE_BRANCH = 'DELETE_BRANCH';
const GET_BRANCH = 'GET_BRANCH'; 

export const addBranch = branch =>  ({type: ADD_BRANCH, branch});
export const deleteBranch = branch =>  ({type: DELETE_BRANCH, branch});
export const getBranch = branch => ({type: GET_BRANCH, branch});

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
