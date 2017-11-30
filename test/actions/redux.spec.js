import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from '../../app/actions/user';

const mockStore = configureMockStore([ thunk ]);

describe('actions', () => {

  describe('user', () => {
    
    it('should log in', () => {
      const store = mockStore({});
      const expectedActions = [{
        type: 'USER_LOGIN',
        payload: {
          username: 'John Doe',
          loggedIn: true
        }
      }];

      store.dispatch(actions.login({
        username: 'John Doe',
        loggedIn: true
      }));

      expect(store.getActions()).deep.equal(expectedActions);
    });

  });

  describe('userPath', () => {
    
    it('should get userPath', () => {
      const store = mockStore({});
      const expectedActions = [{
        type: 'GET_PATH',
        path: '/Users/sreepriyav/Desktop/seniors/test/trial'
  
      }];  
    });

  });

  describe('status', () => {
    
    it('should add status', () => {
      const store = mockStore({});
      const expectedActions = [{
        type: 'ADD_FILE_STATUS',
        fileStatus: []
      }];
    });

  });


  describe('commit', () => {
    
    it('should make status', () => {
      const store = mockStore({});
      const expectedActions = [{
        type: 'MAKE_COMMIT',
        commit: []
      }];
    });

  });

  describe('branches', () => {
    
    it('should get all branches', () => {
      const store = mockStore({});
      const expectedActions = [{
        type: 'GET_ALL_BRANCHES',
        branches: []
      }];
    });

  });

});


  
