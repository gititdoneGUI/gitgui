//const git = require('simple-git')('/Users/sreepriyav/Desktop/seniors/test/dummy');


 
export const pull = (path, branch) =>{
  console.log("hello");
  branch? branch : 'master';
  console.log("branch", branch);
  require('simple-git')(`${path}`).pull('origin', `${branch}`, {'--no-rebase': null});
  // git.pull('origin', 'master', {'--no-rebase': null});
  
};