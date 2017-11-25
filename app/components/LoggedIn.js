import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/repos';
import { fetchHistory } from '../reducers/repo';
import { getPath } from '../actions/userPath';
import { statusCheck } from '../reducers/status';
import CommitGraph from './CommitGraph';
import Header from './Header';
<<<<<<< HEAD
// import Formsy, {withFormsy} from 'formsy-react';
// import { Form, File } from 'formsy-react-components';

=======
import path from 'path';
>>>>>>> origin/master

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
                <br/>
                <br />
                {/* FORM TO CHOOSE A FILE FROM COMPUTER */}

                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Choose a directory.</label>
                    <div className = "select-files-group">
                    <input
                      type="file"
                      name='files'
                      ref={_ => _ && _.setAttribute('webkitdirectory', true)}
                      className="form-control"
                    />
                    <div className="form-actions">
                      <button className="btn btn-mini" type="submit">+</button>
                    </div>
                    </div>
                  </div>
                </form>

                {/* GITHUB ACTION BUTTONS */}
                <div className = "git-methods">

                <button className="btn btn-large btn-primary">
                  <span className="icon icon-list-add icon-text"></span>
                  Commit
                </button>
                <br/>
                <button className="btn btn-large btn-primary">
                  <span className="icon icon-down-circled icon-text"></span>
                  Pull
                </button>
                <br />

                <button className="btn btn-large btn-primary">
                  <span className="icon icon-up-circled icon-text"></span>
                  Push
                </button>
                <br />

                <button className="btn btn-large btn-primary">
                  <span className="icon icon-right-circled icon-text"></span>
                  Fetch
                </button>
                <br />

                <button className="btn btn-large btn-primary active">
                  <span className="icon icon-flow-branch icon-text"></span>
                  Branch
                </button>
                <br />

                <button className="btn btn-large btn-primary">
                  <span className="icon icon-switch icon-text"></span>
                  Merge
                </button>
                <br />

                <button className="btn btn-large btn-primary">
                  <span className="icon icon-trash icon-text"></span>
                  Stash
                </button>
              </div>
              </div>
            </div>
            <div className="pane">
              <CommitGraph />
            </div>
          </div>
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
    getUserPath: path =>{
      dispatch(getPath(path));
    },
    statusCheck: userPath => {
      dispatch(statusCheck(userPath));
    }
  };
};

export default connect(mapState, mapDispatch)(LoggedIn);
