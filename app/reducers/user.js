// const USER_LOGIN = 'USER_LOGIN';

// export const userLogin = username => ({type: USER_LOGIN, username, loggedIn: true});

// const initialState = {username: '', loggedIn: false};

// export default function reducer(state = initialState, action){
//   switch (action.type){
//   case USER_LOGIN:
//     return Object.assign({}, state, {username: action.username}, {loggedIn: true});
//   default:
//     return state;
//   }
// }

import { handleActions } from 'redux-actions';
import actions from '../actions/user';

export default handleActions({
 [actions.login]: (state, action) => {
   return { ...state, ...action.payload };
 }
}, {});