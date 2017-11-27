const {dialog} = require('electron').remote;

export const clone = (path, remote) =>{
  require('simple-git/promise')(`${path}`).clone(`${remote}`)
    .then(()=> console.log(' Clonning Successfully Completed '))
    .catch((err) => openDialogBox(err) ); 
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}