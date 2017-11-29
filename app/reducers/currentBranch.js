var GitKit = require('gitkit');
var NodeFS = require('gitkit/lib/fs/node');

export const currentBranch = (path) =>{   
  // Prepare the filesystem 
  var fs = NodeFS(path);
    
  // Create a repository instance 
  var repo = GitKit.Repository.createWithFS(fs);

  GitKit.BranchUtils.getCurrent(repo)
    .then(function(branch) {  console.log(branch); });
};