import { emptyStatus } from './status';
import { fetchHistory } from './repo';

//with nodegit-kit
const git = require('nodegit-kit');
const path = require('path');


const MAKE_COMMIT = 'MAKE_COMMIT';

export const makeCommit = commit => ({type: MAKE_COMMIT, commit});


export const commit = (commitMessage, userPath) => (dispatch) => {
  git.open(userPath)
    .then(function(repo){
    // git commit -am"a new commit"
      console.log('THIS IS THE REPO', repo)
      return git.commit(repo, {
        'message': commitMessage
      })
        .then(function(oid){
          console.log('IM GETTING HERE', oid.tostrS());

          console.log('THIS IS THE OID', oid.tostrS());
          dispatch(makeCommit(oid.tostrS()));
          console.log('COMMIT MADE');
          console.log('EMPTY STATUS HAPPENED?');
          dispatch(fetchHistory(userPath));
          dispatch(emptyStatus());
        });
    });
};

export default function reducer (state = [], action){
  switch (action.type){
  case MAKE_COMMIT:
    return [...state, action.commit];
  default:
    return state;
  }
}
