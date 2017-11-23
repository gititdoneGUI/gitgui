export const clone = (path, remote) =>{
  require('simple-git')(`${path}`).clone(`${remote}`,()=>{
    console.log(' Clonning Successfully Completed ');
  });

};