// const nodegit = require('nodegit'),
//   path = require('path');
// import { fetchHistory } from '../reducers/repo';

// function commitHistory() { nodegit.Repository.open(path.resolve(__dirname, '../../../TopAlly/.git'))
//   .then(function(repo){
//     return repo.getMasterCommit();
//   })
//   .then(function(firstCommit){
//     const history = firstCommit.history(nodegit.Revwalk.SORT.Time);
//     history.on('commit', commit => {
//       let obj = {};
//       obj.sha = commit.sha();
//       obj.author = commit.author().name();
//       obj.email = commit.author().email();
//       obj.date = commit.date();
//       obj.message = commit.message();
//       console.log(obj);
//       fetchHistory(obj);
//     });
//     history.start();
//   })
//   .done();
// }

// export default commitHistory;
