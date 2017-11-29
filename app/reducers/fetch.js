const {dialog} = require('electron').remote;
var nodegit = require('nodegit');
var path = require('path');

export const fetch = (path, branch) =>{
  let components = branch.split('/');
  require('simple-git/promise')(`${path}`).fetch(components[0], components[1])
    .then(()=> console.log('Fetching Successfully Completed '))
    .catch((err) => openDialogBox(err) ); 
};


function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
      
}


export const fetchALL = (path) =>{
  nodegit.Repository.open(path)
    .then(function(repo) {
      return repo.fetchAll();
    }).then(function() {
      console.log('It worked!');
    })
    .catch((err) => openDialogBox(err) );
};
