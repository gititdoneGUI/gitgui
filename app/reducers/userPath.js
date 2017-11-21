import { action } from '../actions/userRepo';

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_REPO':
      return action.repo;

    default:
      return state;
  }
}