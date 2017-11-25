export const stash = (path) =>{
  require('simple-git/promise')(`${path}`).stash()
    .then(()=> console.log('Stash Successfully Completed '))
    .catch((err) => console.log('An Error Occurred: ',err));

};

