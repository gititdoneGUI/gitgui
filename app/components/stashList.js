import React, { Component } from 'react';
import { connect } from 'react-redux';


class StashList extends Component{
  constructor() {
    super();
    this.state = {
      dropdown: false
    };
  }


  render() {
    return (
      // <div>
      //   { (this.props.stashmessage.length !== 0) ?
      //     (
      //       <form>
      //         {this.props.stashmessage &&
      //     <select>
      //       <option></option>
      //       {
      //         this.props.stashmessage.map((message) => 
      //           <option key={message} value={message}>{message}</option>
      //         )
      //       }
      //     </select>
      //         }
      //       </form>) : (
      //       <h4> Stashes</h4>
      //     ) 
      //   }
      // </div>
      <div className='repo-info'>
        <button id='files-changed-button' onClick={() => this.setState((prevState) => {
          return {...prevState, dropdown: !prevState.dropdown};

        })}>
          <h5>Stashes: {this.props.stashmessage.length} ⌵</h5>
        </button>

        {

        }


      </div>
    );
  }
}


{/* <div className="repo-info">
<h5>Repo: {this.props.userPath.slice( this.props.userPath.lastIndexOf('/')+1)}</h5>
<button id="files-changed-button" onClick={() => this.setState((prevState) => {
  return {...prevState, dropdown: !prevState.dropdown};
})}>
  <h5>Files changed: {this.props.status.length} ⌵</h5>
</button>
{
  this.state.dropdown ? (<ul className="repo-status">
    {this.props.status.map((e, i) => <li key={i}>{e}</li>)}
  </ul>) : ''
}
</div> */}

const mapState = ({stashmessage}) => ({ stashmessage });

export default connect(mapState, null)(StashList);
