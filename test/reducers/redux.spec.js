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

  describe('Make Commit', () => {    
    
    it('make a commit MAKE_COMMIT', () => {
      const action = { 
        type: 'MAKE_COMMIT',
        commit: []

      };
      const test = Object.assign([], action.commit);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

  describe('Add Commit', () => {    
    
    it('add a commit ADD_COMMIT', () => {
      const action = { 
        type: 'ADD_COMMIT',
        commit: {}

      };
      const test = Object.assign([], action.commit);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

  describe('Getbranches', () => {    
    
    it('get all branches GET_ALL_BRANCHES', () => {
      const action = { 
        type: 'GET_ALL_BRANCHES',
        branches: []

      };
      const test = Object.assign([], action.branches);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

  describe('Addbranch', () => {    
    
    it('add a branch ADD_BRANCH', () => {
      const action = { 
        type: 'ADD_BRANCH',
        branch: {}
      };
      const test = Object.assign([], action.branch);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });
  
  describe('Deletebranch', () => {    
    
    it('Delete a branch DELETE_BRANCH', () => {
      const action = { 
        type: 'DELETE_BRANCH',
        branch: {}
      };
      const test = Object.assign([], action.branch);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

  describe('Getbranch', () => {    
    
    it('Get a branch GET_BRANCH', () => {
      const action = { 
        type: 'GET_BRANCH',
        branch: {}
      };
      const test = Object.assign([], action.branch);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

  describe('Graph', () => {    
    
    it('Add a edge ADD_EDGE', () => {
      const action = { 
        type: 'ADD_EDGE',
        edge: {}
      };
      const test = Object.assign([], action.edge);
      expect(userPathReducer([], action)).to.deep.equal(test);
    });
    
  });

});



