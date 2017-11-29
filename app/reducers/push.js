const {dialog} = require('electron').remote;

export const push = (path, branch) =>{
  let components = branch.split('/');
  require('simple-git/promise')(`${path}`).push(components[0], components[1])
    .then(()=> console.log('Push Successfully Completed '))
    .catch((err) => openDialogBox(err) );
       
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}
