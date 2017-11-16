const nodegit = require('nodegit');
const path = require('path');

const GET_COMMIT_HISTORY = 'GET_COMMIT_HISTORY';
const ERASE_HISTORY = 'ERASE_HISTORY';

export const getCommitHistory = history => ({type: GET_COMMIT_HISTORY, history});
const eraseHistory = () => ({type: ERASE_HISTORY});

export const fetchHistory = () => (dispatch) => {
  console.log('got to thunk');
  nodegit.Repository.open(path.resolve(__dirname, '../../../TopAlly/.git'))
    .then(function(repo){
      return repo.getMasterCommit();
    })
    .then(firstCommit =>{
      dispatch(eraseHistory());
      const history = firstCommit.history(nodegit.Revwalk.SORT.Time);
      history.on('commit', commit => {
        let obj = {};
        obj.name = commit.message();
        obj.author = commit.author().name();
        obj.email = commit.author().email();
        obj.date = commit.date();
        obj.sha= commit.sha();
        dispatch(getCommitHistory((obj)));
      });
      history.start();
    })
    .done();
};

export default function (state = {}, action){
  switch (action.type){
  case GET_COMMIT_HISTORY:
    console.log('history', action.history);
    return ({...action.history, children: [state]});
  case ERASE_HISTORY:
    return [];
  default:
    return state;
  }
}

