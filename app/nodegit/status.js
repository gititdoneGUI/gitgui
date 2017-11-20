
const nodegit = require('nodegit');
const path = require('path');

// This code shows working directory changes similar to git status
export function statusCheck() {
  nodegit.Repository.open(path.resolve(__dirname,'../../../juke-react/.git'))
    .then(function(repo) {
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
          console.log(file.path() + ' '  + statusToText(file));

          return statuses;
        });
      });
    });

}




// var git = require('nodegit-kit');

// export function statusCheck() {
//     console.log('in function');
//   git.open(path.resolve(__dirname,'../../../juke-react/.git'))
//     .then(function(repo){
//     // git status
//       return git.status(repo)
//         // .then(function(status){
//         //   console.log(status);
//         //   return status;
//         // });
//     });
// }
 


  