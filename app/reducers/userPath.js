import { action } from '../actions/repo';

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_REPO':
      return action.repo;

    default:
      return state;
  }
}