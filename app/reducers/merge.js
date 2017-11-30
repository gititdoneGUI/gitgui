const {dialog} = require('electron').remote;
// import {fetchHistory} from './repo';


export const merge = (path, options) => {
  require('simple-git')(`${path}`).merge(options);
};

export const mergeFromTo = (path, from, to) => {
  require('simple-git/promise')(`${path}`).mergeFromTo(from, to)
    .then(() => console.log('merge complete'))
    .catch((err) => openDialogBox(err));
  
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}