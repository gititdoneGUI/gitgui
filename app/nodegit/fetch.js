export const fetch = (path, branch) =>{
  require('simple-git')(`${path}`).fetch('origin', `${branch}`, ()=>{
    console.log('finished fetching ');
  });

};