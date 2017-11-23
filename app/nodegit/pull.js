//const git = require('simple-git')('/Users/sreepriyav/Desktop/seniors/test/dummy');


 
export const pull = (path, branch) =>{
  require('simple-git')(`${path}`).pull('origin', `${branch}`, {'--no-rebase': null})
    .exec(() => console.log('finished pulling '));
    
   
  // git.pull('origin', 'master', {'--no-rebase': null});

};