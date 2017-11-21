import { action } from '../actions/userPath';

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
  case 'GET_PATH':
    return action.path;
  default:
    return state;
  }
}
