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
import {userLogin} from './reducers/user';

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...userLogin,
    push
  };

  const reducers = {
    user,
    routing,
    repos,
    repo,
    status,
    commit
  };

  const middlewares = [ thunk, router ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
