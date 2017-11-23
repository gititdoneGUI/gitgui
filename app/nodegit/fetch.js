//const git = require('simple-git')('/Users/sreepriyav/Desktop/seniors/test/dummy');
 
export const fetch = (path, branch) =>{
  require('simple-git')(`${path}`).fetch('origin', `${branch}`, ()=>{
    console.log('finished fetching ');
  });

    
   
  // git.pull('origin', 'master', {'--no-rebase': null});

};