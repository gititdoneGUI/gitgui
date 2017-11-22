import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/repos';
// import {NavLink} from 'react-router-dom';
import { fetchHistory } from '../reducers/repo';
import { getRepo } from '../actions/userRepo';
import CommitGraph from './Graph';
import Header from './Header';

class LoggedIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.allRepos(this.props.user.username);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.getUserRepo(evt.target.dirname.value);
    this.props.getRepo(evt.target.dirname.value);
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
              <label>Choose a local directory.</label>
                <input type="file" webkitdirectory className="form-control" name="dirname"  />
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
    getUserRepo: path =>{
      dispatch(getRepo(path));
    }
  };
};

export default connect(mapState, mapDispatch)(LoggedIn);
