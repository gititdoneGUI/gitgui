import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commit } from '../reducers/commit';
import { statusCheck } from '../reducers/status';

class Commit extends Component {
  constructor() {
    super();
    this.state = {
      commitMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.commit(this.state.commitMessage, this.props.userPath);
  }

  handleChange(event) {
    this.setState({ commitMessage: event.target.value });
  }

  render(){
    return (
      <div>
        {
          (this.props.status.length !== 0) ?
            (<form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input className='form-control' value={this.state.commitMessage} onChange={this.handleChange} placeholder="Commit message..."></input>
                <button type='submit' className="btn btn-mini btn-primary">
                  <span className="icon icon-list-add icon-text"></span>
              Submit Commit
                </button>
              </div>
            </form>)
            :
            (<button className="btn btn-large btn-default" disabled={true}>
              <span className="icon icon-list-add icon-text"></span>
            Nothing to Commit
            </button>)
        }
      </div>
    );
  }
}

const mapState = ({ repo, status, commit, userPath }) => ({ repo, status, commit, userPath });

const mapDispatch = (dispatch) => {
  return {
    statusCheck: (rootDir) =>
      dispatch(statusCheck(rootDir)),
    commit: (commitMessage, userPath) =>
      dispatch(commit(commitMessage, userPath))
  };
};

export default connect(mapState, mapDispatch)(Commit);
