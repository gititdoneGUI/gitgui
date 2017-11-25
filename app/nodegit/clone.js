export const clone = (path, remote) =>{
  require('simple-git/promise')(`${path}`).clone(`${remote}`)
    .then(()=> console.log(' Clonning Successfully Completed '))
    .catch((err) => console.log('An Error Occurred: ',err));

};

