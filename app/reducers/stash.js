const {dialog} = require('electron').remote;

export const stash = (path) =>{
  require('simple-git/promise')(`${path}`).stash()
    .then(()=> console.log('Stash Successfully Completed '))
    .catch((err) => openDialogBox(err) );
  
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}