const {dialog} = require('electron').remote;

export const merge = (path, options) => {
  require('simple-git')(`${path}`).merge(options);
};

export const mergeFromTo = (path, from, to) => {
  require('simple-git/promise')(`${path}`).mergeFromTo(from, to)
    .catch((err) => openDialogBox(err));
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
}
