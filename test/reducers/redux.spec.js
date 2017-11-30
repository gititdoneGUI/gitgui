import { expect } from 'chai';
import userReducer from '../../app/reducers/user';
import userPathReducer from '../../app/reducers/userPath';

describe('reducers', () => {

  describe('user', () => {    
    
    it('should handle USER_LOGIN', () => {
      const action = { 
        type: 'USER_LOGIN',
        payload: {
          username: 'John Doe', 
          loggedIn: true 
        }
      };
      const test = Object.assign({}, action.payload);
      expect(userReducer({}, action)).to.deep.equal(test);
    });
    
  });

  describe('userPath', () => {    
    
    it('should handle GET_PATH', () => {
      const action = { 
        type: 'GET_PATH',
        path: '/Users/sreepriyav/Desktop/seniors/test/trial'

      };
      const test =  action.path;
      expect(userPathReducer('', action)).to.deep.equal(test);
    });
    
  });

  describe('File Status', () => {    
    
    it('Add file status ADD_FILE_STATUS', () => {
      const action = { 
        type: 'ADD_FILE_STATUS',
        fileStatus: []

      };
      const test = Object.assign([], action.fileStatus);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

});

