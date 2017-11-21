//with nodegit-kit
const git = require('nodegit-kit');
const path = require('path');


const MAKE_COMMIT = 'MAKE_COMMIT';

export const makeCommit = commit => ({type: MAKE_COMMIT, commit});


export const commitTest = () => (dispatch) => {
  git.open(path.resolve(__dirname, '../../../juke-react/.git'))
    .then(function(repo){
    // git commit -am"a new commit"
      return git.commit(repo, {
        'message': 'trying again!!!!'
      })
        .then(function(oid){
          console.log(oid.tostrS());
          dispatch(makeCommit(oid.tostrS()));
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
