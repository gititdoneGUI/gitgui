const nodegit = require('nodegit');
const path = require('path');

const ADD_COMMITS = 'ADD_COMMITS';
const ERASE_HISTORY = 'ERASE_HISTORY';
const ADD_EDGE = 'ADD_EDGE';

export const addCommits = commits => ({type: ADD_COMMITS, commits});
const addEdge = edge => ({type: ADD_EDGE, edge});
const eraseHistory = () => ({type: ERASE_HISTORY});

const sliceMessage = string => {
  return string.length <= 25
    ? string
    : string.slice(0, 22) + '...';
};

export const fetchHistory = rootDir => (dispatch) => {
  rootDir = rootDir ? rootDir : path.resolve(path.join(__dirname, '..', '..'));
  nodegit.Repository.open(rootDir)
    .then(function(repo){
      return repo.getMasterCommit();
    })
    .then(firstCommit =>{
      dispatch(eraseHistory());
      const history = firstCommit.history(nodegit.Revwalk.SORT.Time);
      const nodeMap = new Map();
      history.on('commit', commit => {
        // dispatch(addCommit(commit));
        let nodeObj = {};
        nodeObj.id = commit.sha();
        nodeObj.label = sliceMessage(commit.message());
        nodeObj.message = commit.message();
        nodeObj.title = commit.date();
        nodeObj.author = commit.author().toString();
        nodeMap.has(commit.sha())
          ? null
          : nodeMap.set(commit.sha(), nodeObj);//
        console.log('HIIII PRIYA', nodeMap);
        var numParents = commit.parentcount();
        for (let i = 0; i < numParents; i++ ) {
          commit.parent(i).then(function(parent) {
            dispatch(addEdge(
              {from: parent.sha(), to: commit.sha()}
            ));
          });
        }
      });
      dispatch(addCommits(nodeMap));
      history.start();

    }).done();
};

const defaultState = { nodes: new Map(), edges: [] };

export default function reducer (state = defaultState, action){
  // console.log('reached reducer', action.type);
  switch (action.type){
  case ADD_COMMITS:
  {console.log('HERE BE A MAP', action.commits);
    return {...state, nodes: action.commits};}
  case ADD_EDGE:
    return {...state, edges: [...state.edges, action.edge]};
  case ERASE_HISTORY:
    return defaultState;
  default:
    return state;
  }
}
