import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/repos';
import { fetchHistory } from '../reducers/repo';
import { getPath } from '../actions/userPath';
import { statusCheck } from '../reducers/status';
import { currentBranch } from '../reducers/currentBranch';
import GitButtons from './GitButtons';
import BranchRemoteLists from './BranchRemoteLists';
import CommitGraph from './CommitGraph';
import StashList from './StashList';
import Header from './Header';

const {dialog} = require('electron').remote;

const openDir = cb => evt => {dialog.showOpenDialog({properties: ['openDirectory']}, cb);
};

class LoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      edges: [],
      dropdown: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick(event){
    const { nodes, edges } = event;
    this.setState({ nodes: nodes, edges: edges });
  }

  handleSubmit(evt) {
    const userFilePath = evt[0];
    this.props.getUserPath(userFilePath);
    this.props.getCurrentBranch(userFilePath);
    this.props.statusCheck(userFilePath);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentBranch !== this.props.currentBranch){
      this.props.fetchHistory(this.props.userPath, nextProps.currentBranch);
    }
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
                {this.props.user.username.length ? <p id="logged-in-as">Logged in as <b>{this.props.user.username}</b></p> : null}
                {/* FORM TO CHOOSE A FILE FROM COMPUTER */}
                <button className="btn btn-large btn-default" type="submit" onClick={openDir(this.handleSubmit)}>
                  <span className="icon icon-list-add icon-text"></span>
                Choose a directory
                </button>
                <hr />
                {/* GITHUB ACTION BUTTONS */}
                <div className="repo-info">
                  <h5>Repo: {this.props.userPath.slice( this.props.userPath.lastIndexOf('/')+1)}</h5>
                  <h5>Current Branch: {this.props.currentBranch}</h5>


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
                  <BranchRemoteLists />
                </div>
                <hr />
                <StashList/>
                <hr />
                <GitButtons />
                <hr />
                <div>
                  {ele &&
                      <ul className = "commit-info">
                        <label>Commit Info:</label>
                        <li className="sha">
                          <span className="icon icon-github"></span>
                          {'  ' + ele.id}
                        </li>
                        <li> <span className="icon icon-pencil"></span>
                          {'  ' + '"' + ele.message + '"'}</li>
                        <li> <span className="icon icon-user"></span>
                          {'  ' + ele.author.slice(0, ele.author.indexOf('<'))}</li>
                        <li><span className="icon icon-mail"></span>
                          {'  '+ ele.author.slice(ele.author.indexOf('<')+1, ele.author.indexOf('>'))}
                        </li>
                        <li> <span className="icon icon-clock"></span>
                          {'  ' + ele.title.toString()}</li>
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

const mapState = ({repos, user, userPath, currentBranch}) => ({repos, user, userPath, currentBranch});

const mapDispatch = dispatch => {
  return {
    allRepos: username => {
      dispatch(fetchRepos(username));
    },
    fetchHistory: (name, branch) => {
      dispatch(fetchHistory(name, branch));
    },
    getUserPath: path => {
      dispatch(getPath(path));
    },
    statusCheck: userPath => {
      dispatch(statusCheck(userPath));
    },
    getCurrentBranch: userPath => {
      dispatch(currentBranch(userPath));
    }
  };
};

export default connect(mapState, mapDispatch)(LoggedIn);
