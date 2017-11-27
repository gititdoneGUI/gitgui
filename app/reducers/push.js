const {dialog} = require('electron').remote;

export const push = (path, branch) =>{
  require('simple-git/promise')(`${path}`).push('origin', `${branch}`)
    .then(()=> console.log('Push Successfully Completed '))
    .catch((err) => openDialogBox(err) );
       
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}