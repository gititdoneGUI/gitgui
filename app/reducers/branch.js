const {dialog} = require('electron').remote;

export const branch = (path) =>{
  require('simple-git/promise')(`${path}`).branch()
    .then((arr)=> console.log(' List of branches Successfully Completed ', arr))
    .catch((err) => openDialogBox(err) ); 
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}