var nodegit = require('nodegit');
var repository;

export const pull = (userPath) =>{
  console.log("path",userPath);
  return nodegit.Repository.open(userPath)
  .then(function(repo) {
    console.log(repo);
    repository = repo;
    return repository.fetchAll();
  })
  .then(function(branches){
    console.log(branches);
  })
  // Now that we're finished fetching, go ahead and merge our local branch
  // with the new one
  // .then(function() {
  //   return repository.mergeBranches('master', 'origin/master');
  // })
  .done(function() {
    console.log('Done!');
  });
};
