import { action } from '../actions/repos';

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
  case 'GET_REPOS':
    return action.repos;

  default:
    return state;
  }
}