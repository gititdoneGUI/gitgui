const nodegit = require('nodegit');
const path = require('path');
const _ = require('lodash');

const ADD_FILE_STATUS = 'ADD_FILE_STATUS';
const EMPTY_STATUS = 'EMPTY_STATUS';

export const addFileStatus = fileStatus => ({type: ADD_FILE_STATUS, fileStatus});
export const emptyStatus = () => ({type: EMPTY_STATUS});

export const statusCheck = (rootDir) => (dispatch) => {
  rootDir = rootDir ? rootDir : path.resolve(path.join(__dirname, '..', '..'));
  nodegit.Repository.open(rootDir)
    .then(function(repo) {
      dispatch(emptyStatus());
      repo.getStatus().then(function(statuses) {
        function statusToText(status) {
          let words = [];
          if (status.isNew()) { words.push('NEW'); }
          if (status.isModified()) { words.push('MODIFIED'); }
          if (status.isTypechange()) { words.push('TYPECHANGE'); }
          if (status.isRenamed()) { words.push('RENAMED'); }
          if (status.isIgnored()) { words.push('IGNORED'); }
          return words.join(' ');
        }
        statuses.forEach(function(file) {
          dispatch(addFileStatus(file.path() + ' '  + statusToText(file)));
        });
      });
    });

};

export default function reducer (state = [], action){
  // console.log('reached reducer', action.type);
  switch (action.type){
  case ADD_FILE_STATUS:
    return [...state, action.fileStatus];
  case EMPTY_STATUS:
    return [];
  default:
    return state;
  }
}
