const {dialog} = require('electron').remote;

export const pull = (path, branch) =>{
  let components = branch.split('/');

  require('simple-git/promise')(`${path}`).pull(components[0], components[1], {'--no-rebase': null})
    .then(()=> console.log('Pull Successfully Completed '))
    .catch((err) => openDialogBox(err) );
       
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}