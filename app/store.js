import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import user from './reducers/user';
import repos from './reducers/repos';
import status from './reducers/status';
import commit from './reducers/commit';

// import userActions from './actions/user';
import repo from './reducers/repo';
import userPath from './reducers/userPath';
import {userLogin} from './reducers/user';
// import branches from './reducers/branches';
// import branch from './reducers/branches';
import localBranch from './reducers/localBranch';
import remoteBranch from './reducers/remoteBranch';
import currentBranch from './reducers/currentBranch';

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...userLogin,
    push
  };

  const reducers = {
    userPath,
    user,
    routing,
    repos,
    repo,
    status,
    commit,
    localBranch,
    remoteBranch,
    currentBranch
  };

  const nukeable = reducer => (state, action) =>
    action.type === 'store/NUKE'
      ? reducer(undefined, '@@INIT')
      : reducer(state, action);

  const middlewares = [ thunk, router ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const rootReducer = nukeable(combineReducers(reducers));

  //PERSIST THE STORE TO LOCAL STORAGE

  const store = createStore(rootReducer, localStorage.storeState && JSON.parse(localStorage.storeState), enhancer);
  store.subscribe(() => localStorage.storeState = JSON.stringify(store.getState()));

  return store;
}

