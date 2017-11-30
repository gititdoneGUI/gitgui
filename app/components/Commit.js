import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commit } from '../reducers/commit';
import { statusCheck } from '../reducers/status';

class Commit extends Component {
  constructor() {
    super();
    this.state = {
      commitMessage: '', 
      clicked: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.commit(this.state.commitMessage, this.props.userPath);
    this.setState({clicked: false});    
  }

  handleChange(event) {
    this.setState({ commitMessage: event.target.value });
  }

  render(){
    return (
      <div>
        {
          (this.props.status.length !== 0) ?
            (<button type='submit' className="btn btn-mini btn-primary" onClick={this.handleClick}>
              <span className="icon icon-list-add icon-text"></span>
               Commit
            </button>):
            (<button className="btn btn-large btn-default" disabled={true}>
              <span className="icon icon-list-add icon-text"></span>
            Nothing to Commit
            </button>)
        }

        {
          this.state.clicked && 
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <input className='form-control' value={this.state.commitMessage} onChange={this.handleChange} placeholder="Commit message..."></input>
              <button type='submit' className="btn btn-mini btn-primary">
                <span className="icon icon-list-add icon-text"></span>
          Commit
              </button>
            </div>
          </form>
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
