import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchRepos} from '../actions/repos';
import {NavLink} from 'react-router-dom';
import { fetchHistory } from '../reducers/repo';
import CommitGraph from './Graph';

class LoggedIn extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLogOut = () => {
    this.props.onLogout({
      username: '',
      loggedIn: false
    });
  };

  componentDidMount() {
    this.props.allRepos(this.props.user.username);
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.getRepo(evt.target.dirname.value);
  }

  render() {
    return (
      <div>
        <h2>Logged in as {this.props.user.username}</h2>
        <h2>Repos:</h2>
        {this.props.repos &&
          this.props.repos.map((repo,i) => <li key={i}>{repo.name}</li>
          )}
        <form onSubmit={this.handleSubmit}>
          Input the aboslute path to your directory.<br/>
          <input type="text" name="dirname"></input><button>Enter</button>
        </form>
        <CommitGraph />
        <br />
        <br />
        <br />
        <button onClick={this.handleLogOut}>Log Out</button>
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
    }
  };
};

export default connect(mapState, mapDispatch)(LoggedIn);
