import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/repos';
import { fetchHistory } from '../reducers/repo';
import { getPath } from '../actions/userPath';
import { statusCheck } from '../reducers/status';
import {gitRoot} from '../gitutil';
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
    this.state = {
      nodes: [],
      edges: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount() {
    // const root = gitRoot(process.cwd());
    this.props.allRepos(this.props.user.username);
    // this.props.getUserPath(root);
    // change back to using root
  }

  handleNodeClick(event){
    const { nodes, edges } = event;
    this.setState({ nodes: nodes, edges: edges });
  }

  handleSubmit(evt) {
    console.log('THIS IS THE EVENT', evt[0]);
    const userFilePath = evt[0];
    this.props.getUserPath(userFilePath);
    this.props.fetchHistory(userFilePath);
    this.props.statusCheck(userFilePath);
  }

  render() {
    const ele = this.state.nodes[0]
      ? this.props.repo.nodes.filter(node => node.id == this.state.nodes[0])[0]
      : null;

    return (
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-med sidebar">

              {/* WELCOME MSG AND FORM FOR GITHUB REPO*/}
              <div className="home-page-forms">

                <p id="logged-in-as">Logged in as <b>{this.props.user.username}</b></p>
                {/*}
                <select className="form-control">
                  <option>Pick a github repo...</option>
                  {this.props.repos &&
              this.props.repos.map((repo, i) => <option key={i}>{repo.name}</option>
              )}
                </select>
                <p><b>OR</b></p>
            */}
                {/* FORM TO CHOOSE A FILE FROM COMPUTER */}
                <button className="btn btn-large btn-default" type="submit" onClick={openDir(this.handleSubmit)}>
                  <span className="icon icon-list-add icon-text"></span>
                Choose a directory
                </button>
                <hr />
                {/* GITHUB ACTION BUTTONS */}
                <GitButtons />
                <hr />
                <div>
                  {ele &&
                      <ul className = "commit-info">
                        <label>Commit Info:</label>

                        <li className="sha"> <span className="icon icon-github"></span>
                          {'  ' + ele.id}</li>
                        <li> <span className="icon icon-pencil"></span>
                          {'  ' + '"' + ele.message + '"'}</li>
                        <li> <span className="icon icon-user"></span>
                          {'  ' + ele.author.slice(0, ele.author.indexOf('<'))}</li>
                        <li><span className="icon icon-mail"></span>
                          {'  '+ ele.author.slice(ele.author.indexOf('<')+1, ele.author.indexOf('>'))}
                        </li>
                        <li> <span className="icon icon-clock"></span>
                          {'  ' + ele.title.toString().slice(0,(ele.title.toString().indexOf('G')-4))}</li>
                      </ul>
                  }
                </div>
              </div>
            </div>
            {this.props.userPath ? <CommitGraph handleNodeClick={this.handleNodeClick} /> :
              (
              <div id='default-graph-msg-container'>
              <h1 id='default-graph-msg'>Choose a directory to display.</h1>
              </div>
              )
            }
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
    fetchHistory: name => {
      dispatch(fetchHistory(name));
    },
    getUserPath: path => {
      if(typeof path === 'string') dispatch(getPath(path));
      else path.then(path => dispatch(getPath(path)));
    },
    statusCheck: userPath => {
      dispatch(statusCheck(userPath));
    }
  };
};

export default connect(mapState, mapDispatch)(LoggedIn);
