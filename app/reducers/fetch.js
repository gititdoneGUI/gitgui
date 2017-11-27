const {dialog} = require('electron').remote;

export const fetch = (path, branch) =>{
    
  require('simple-git/promise')(`${path}`).fetch('origin', `${branch}`)
    .then(()=> console.log('Fetching Successfully Completed '))
    .catch((err) => openDialogBox(err) ); 
};


function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
      
}