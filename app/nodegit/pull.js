export const pull = (path, branch) =>{
  require('simple-git/promise')(`${path}`).pull('origin', `${branch}`, {'--no-rebase': null})
    .then(()=> console.log('Pull Successfully Completed '))
    .catch((err) => console.log('An Error Occurred: ',err));
     
};
