const {dialog} = require('electron').remote;

export const stash = (path) =>{
  require('simple-git/promise')(`${path}`).stashList()
    .then((list)=> console.log('Stash Successfully Completed ', list))
    .catch((err) => openDialogBox(err) );
  
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}