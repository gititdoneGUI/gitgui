import { fetchHistory } from './repo';

const MAKE_COMMIT = 'MAKE_COMMIT';

export const makeCommit = commit => ({type: MAKE_COMMIT, commit});

export const commit = (commitMessage, userPath, currentBranch) => (dispatch) => {
  require('simple-git')(userPath)
    .add('./*')
    .commit(commitMessage)
    .exec(() => dispatch(fetchHistory(userPath, currentBranch)));
};

export default function reducer (state = [], action){
  switch (action.type){
  case MAKE_COMMIT:
    return [...state, action.commit];
  default:
    return state;
  }
}
