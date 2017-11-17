const nodegit = require('nodegit');
const path = require('path');

const ADD_COMMIT = 'ADD_COMMIT';
const ERASE_HISTORY = 'ERASE_HISTORY';
const ADD_EDGE = 'ADD_EDGE';

export const addCommit = commit => ({type: ADD_COMMIT, commit});
const addEdge = edge => ({type: ADD_EDGE, edge});
const eraseHistory = () => ({type: ERASE_HISTORY});

export const fetchHistory = () => (dispatch) => {
  console.log('got to thunk');
  nodegit.Repository.open(path.resolve(__dirname, '../../../juke-react/.git'))
    .then(function(repo){
      console.log('GOT TO REPO');
      return repo.getMasterCommit();
    })
    .then(firstCommit =>{
      dispatch(eraseHistory());
      const history = firstCommit.history(nodegit.Revwalk.SORT.Time);
      console.log(firstCommit.sha());
      history.on('commit', commit => {
        console.log("OVER HERE");
        console.log(commit.sha());
        let obj = {};
        obj.id = commit.sha();
        obj.label= commit.messsage();
        obj.title = commit.date();
        dispatch(addCommit((obj))); 
        console.log('PARENTS', commit.parents());
        commit.parents().forEach(parent => 
          dispatch(addEdge(
            {from: parent, to: commit.sha()})
          )
        );
        history.start();
      })
        .done();
    });
};

const defaultState = { nodes: [], edges: [] };

export default function (state = defaultState, action){
  switch (action.type){
  case ADD_COMMIT:
    return {...state, nodes: state.nodes.concat(action.commit)};
  case ADD_EDGE:
    return {...state, edges: state.edges.concat(action.edge)};
  case ERASE_HISTORY:
    return defaultState;
  default:
    return state;
  }
}
