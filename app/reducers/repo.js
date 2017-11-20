const nodegit = require('nodegit');
const path = require('path');

const ADD_COMMIT = 'ADD_COMMIT';
const ERASE_HISTORY = 'ERASE_HISTORY';
const ADD_EDGE = 'ADD_EDGE';

export const addCommit = commit => ({type: ADD_COMMIT, commit});
const addEdge = edge => ({type: ADD_EDGE, edge});
const eraseHistory = () => ({type: ERASE_HISTORY});

export const fetchHistory = () => (dispatch) => {
  nodegit.Repository.open(path.resolve(__dirname, '../../../cheerbot/.git'))
    .then(function(repo){
      return repo.getMasterCommit();
    })
    .then(firstCommit =>{
      dispatch(eraseHistory());
      const history = firstCommit.history(nodegit.Revwalk.SORT.Time);
      history.on('commit', commit => {
        let obj = {};
        obj.id = commit.sha();
        obj.label= commit.message();              
        obj.title = commit.date();
        console.log("about to addCommit");
        dispatch(addCommit(obj)); 
        var numParents = commit.parentcount();
        for (let i = 0; i < numParents; i++ ) {
          commit.parent(i).then(function(parent) {
            console.log(parent.sha());
            dispatch(addEdge(
              {from: parent.sha(), to: commit.sha()}
            ));
          });
        }
      });

      history.start();
      
    }).done();
};

const defaultState = { nodes: [], edges: [] };

export default function reducer (state = defaultState, action){
  console.log('reached reducer', action.type);
  switch (action.type){
  case ADD_COMMIT:
    return {...state, nodes: [...state.nodes, action.commit]};
  case ADD_EDGE:
    return {...state, edges: [...state.edges, action.edge]};
  case ERASE_HISTORY:
    return defaultState;
  default:
    return state;
  }
}
