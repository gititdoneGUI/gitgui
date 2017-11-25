export const fetch = (path, branch) =>{
  
  require('simple-git/promise')(`${path}`).fetch('origin', `${branch}`)
    .then(()=> console.log('Fetching Successfully Completed '))
    .catch((err) => console.log('An Error Occurred: ',err));

};