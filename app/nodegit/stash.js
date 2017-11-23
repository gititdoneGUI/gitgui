export const stash = (path) =>{
  require('simple-git')(`${path}`).stash(()=>{
    console.log('finished stashing ');
  });

};