const {dialog} = require('electron').remote;
import {addStashMessage} from '../actions/stashMessage';
export const stash = (path) => (dispatch)=>{

  require('simple-git/promise')(`${path}`).stash()
    .then(()=> console.log('Stash Successfully Completed '))
    .catch((err) => openDialogBox(err) );


  require('simple-git/promise')(`${path}`).stashList()
    .then((list)=> {
      dispatch(addStashMessage(list.latest.message));
      console.log('StashList', list.latest.message);})
    .catch((err) => openDialogBox(err) );
  
};

function openDialogBox(err) {
  const title = 'Error';
  const content = `${err}`;
  dialog.showErrorBox(title, content);
    
}


export default function reducer (state = [], action){
  switch (action.type){
  case 'ADD_STASH_MESSAGE':
    return [...state, action.stashmessage];
  default:
    return state;
  }
}