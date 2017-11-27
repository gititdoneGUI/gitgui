const {dialog} = require('electron').remote;

export const pull = (path, branch) =>{
  require('simple-git/promise')(`${path}`).pull('origin', `${branch}`, {'--no-rebase': null})
    .then(()=> console.log('Pull Successfully Completed '))
    .catch((err) => openDialogBox(err) );
       
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}