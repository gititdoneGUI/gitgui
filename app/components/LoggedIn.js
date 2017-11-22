import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/repos';
import { fetchHistory } from '../reducers/repo';
import { getPath } from '../actions/userPath';
import { statusCheck } from '../reducers/status';
import CommitGraph from './CommitGraph';
import Header from './Header';
import path from 'path';

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
    evt.preventDefault();
    this.props.getUserPath(evt.target.dirname.value);
    this.props.getRepo(evt.target.dirname.value);
    this.props.statusCheck(evt.target.dirname.value);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home-page-div">
          <p>Logged in as <b>{this.props.user.username}</b></p>
          <div className="home-page-forms">
          <select className="form-control">
              <option>Pick a github repo...</option>
            {this.props.repos &&
              this.props.repos.map((repo, i) => <option key={i}>{repo.name}</option>
              )}
          </select>
          <br/>
          <br />

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>To view a directory, input its aboslute path:</label>
              <input ref={(ref) => { this._inputRef = ref; }} type="text" className="form-control" placeholder="haxor99" name="dirname" />

              <button className="btn btn-default" onClick={this.handleLogin}>
              <span className="icon icon-login"></span>
              </button>
            </div>
          </form>
          </div>
          <br />
          <CommitGraph />
      </div>
      </div>

    );
  }
}

//CONTAINER
const mapState = state => {
  return {
    repos: state.repos
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
