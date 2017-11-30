const {dialog} = require('electron').remote;

const ADD_BRANCH = 'ADD_BRANCH';
const DELETE_BRANCH = 'DELETE_BRANCH';
const GET_BRANCH = 'GET_BRANCH';
const GET_ALL_BRANCHES = 'GET_ALL_BRANCHES';

import { setCurrentBranch } from '../actions/currentBranch';
import { fetchHistory } from './repo';

export const addBranch = branch =>  ({type: ADD_BRANCH, branch});
export const deleteBranch = branch =>  ({type: DELETE_BRANCH, branch});
export const getBranch = branch => ({type: GET_BRANCH, branch});
export const getAllBranches  = branches => ({type: GET_ALL_BRANCHES, branches});

export const fetchAllBranches = (path) => (dispatch)=>{

  return  require('simple-git/promise')(`${path}`).branch()
    .then((obj)=> {
      dispatch(getAllBranches(obj['all']));
    })
    .catch((err) => openDialogBox(err) );
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
}

export const checkoutBranch = (path, branchName, startPoint) => (dispatch) => {
  require('simple-git/promise')(`${path}`).checkoutBranch(branchName, startPoint)
    .then((obj) => {
      dispatch(addBranch(obj));
    }).catch(err => openDialogBox(err));
};

export const checkoutLocalBranch = (path, branchName) => (dispatch) => {
  require('simple-git/promise')(`${path}`).checkoutLocalBranch(branchName)
    .then((obj) => {
      dispatch(addBranch(obj));
    }).catch(err => openDialogBox(err));
};

export const deleteLocalBranch = (path, branchName) => (dispatch) => {
  require('simple-git/promise')(`${path}`).deleteLocalBranch(branchName)
    .then((obj) => {
      console.log(obj);
      dispatch(deleteBranch(obj));
    })
    .catch(err => openDialogBox(err));
};

export const checkout = (path, checkoutWhat) => (dispatch) => {
  require('simple-git/promise')(`${path}`).checkout(checkoutWhat)
    .then((obj) => {
      dispatch(getBranch(obj));
    })
    .catch(err => openDialogBox(err));
};


export default function reducer (state = [], action){
  switch (action.type){
  case ADD_BRANCH:
    return [...state, action.branch];
  case DELETE_BRANCH:
    return [...state].filter(item => item !== action.branch);
  case GET_BRANCH:
    return action.branch;
  case GET_ALL_BRANCHES:
    return action.branches;
  default:
    return state;
  }
}
