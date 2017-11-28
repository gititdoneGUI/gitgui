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
      userFilePath:'',
      clicked: false
    };
    this.handleCloneClick = this.handleCloneClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserRes = this.handleUserRes.bind(this);
  }

  handleSubmit(evt) {
    console.log('THIS IS THE EVENT', evt[0]);
    const userFilePath = evt[0];
    this.setState({userFilePath});
  }

  handleUserRes(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  handleCloneClick(event) {
    event.preventDefault();
    clone(this.state.userFilePath, event.target.clonefrom.value);
    this.setState({clicked: false});
  }

  render() {
    return (

      <div>
        { !this.state.clicked && <button className="btn btn-large btn-primary" onClick={this.handleUserRes}>
          <span className="icon icon-down-circled icon-text"></span>
        Clone
        </button>}

        { this.state.clicked &&
        <div>
          <button className="btn btn-large btn-default" type="submit" onClick={openDir(this.handleSubmit)}>
            <span className="icon icon-list-add icon-text"></span>
            Choose a directory to clone into
          </button>

          <form onSubmit={this.handleCloneClick}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Repo to clone from..."
                name="clonefrom"
              />
              <button type="submit" className="btn btn-mini btn-primary">
                <span className="icon icon-down-circled icon-text"></span>
              Submit Clone
              </button>
            </div>

          </form>
        </div>
        }
      </div>

    );
  }
}


const mapState = ({userPath }) => ({
  userPath
});


export default connect(mapState, null)(Clone);

