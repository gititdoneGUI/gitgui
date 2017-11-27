import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/repos';
import { fetchHistory } from '../reducers/repo';
import { getPath } from '../actions/userPath';
import { statusCheck } from '../reducers/status';
import GitButtons from './GitButtons';
import CommitGraph from './CommitGraph';
import Header from './Header';
import path from 'path';

const {dialog} = require('electron').remote;

const openDir = cb => evt => {dialog.showOpenDialog({properties: ['openDirectory']}, cb);
};



class LoggedIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.allRepos(this.props.user.username);
    this.props.getUserPath(path.resolve(path.join(__dirname, '..', '..')));
    // change back to using root
  }

  handleSubmit(evt) {
    console.log('THIS IS THE EVENT', evt[0]);
    const userFilePath = evt[0];
    this.props.getUserPath(userFilePath);
    this.props.getRepo(userFilePath);
    this.props.statusCheck(userFilePath);
  }

  render() {
    return (
      <div className="window">

        <Header />
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-med sidebar">

              {/* WELCOME MSG AND FORM FOR GITHUB REPO*/}
              <div className="home-page-forms">

                <p>Logged in as <b>{this.props.user.username}</b></p>
                <select className="form-control">
                  <option>Pick a github repo...</option>
                  {this.props.repos &&
              this.props.repos.map((repo, i) => <option key={i}>{repo.name}</option>
              )}
                </select>
                <p><b>OR</b></p>
                {/* FORM TO CHOOSE A FILE FROM COMPUTER */}
                <button className="btn btn-large btn-default" type="submit" onClick={openDir(this.handleSubmit)}>
                  <span className="icon icon-list-add icon-text"></span>
                Choose a directory.
                </button>
                <hr />
                {/* GITHUB ACTION BUTTONS */}
                <GitButtons />
              </div>
            </div>
            <CommitGraph />
          </div>
        </div>
      </div>

    );
  }
}



// setTimeout(openDir(console.log), 200)

const mapState = state => {
  return {
    repos: state.repos,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    allRepos: username => {
      dispatch(fetchRepos(username));
    },
    getRepo: name => {
      dispatch(fetchHistory(name));
    },
    getUserPath: path =>{
      dispatch(getPath(path));
    },
    statusCheck: userPath => {
      dispatch(statusCheck(userPath));
    }
  };
};

export default connect(mapState, mapDispatch)(LoggedIn);
