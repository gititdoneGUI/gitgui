import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clone } from '../reducers/clone';
const {dialog} = require('electron').remote;

const openDir = cb => evt => {dialog.showOpenDialog({properties: ['openDirectory']}, cb);
};

class Clone extends Component {

  constructor(props) {
    super(props);
    this.state={
      userFilePath:''
    };
    this.handleCloneClick = this.handleCloneClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    console.log('THIS IS THE EVENT', evt[0]);
    const userFilePath = evt[0];
    this.setState({userFilePath});
  }

  handleCloneClick(event) {
    event.preventDefault();
    clone(this.state.userFilePath, event.target.clonefrom.value);
  }

  render() {
    return (
      <div>
        <button className="btn btn-large btn-default" type="submit" onClick={openDir(this.handleSubmit)}>
          <span className="icon icon-list-add icon-text"></span>
            Choose a directory to Clone Into
        </button>

        <form  className="form-group"  onSubmit={this.handleCloneClick}>
          {/* <label>Clone into (Local Repo): </label>
        <input
          type="text"
          className="form-control"
          placeholder="haxor99"
          name="cloneinto"
        /> */}
       
          <label>Clone from (Remote Repo): </label>
          <input
            type="text"
            className="form-control"
            placeholder="haxor99"
            name="clonefrom"
          />
          <button className="btn btn-large btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
          Clone
          </button>
        </form>
      </div>

    );
  }
}


const mapState = ({userPath }) => ({
  userPath
});


export default connect(mapState, null)(Clone);

