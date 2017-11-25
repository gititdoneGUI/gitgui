import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commitTest } from '../reducers/commit';
import { statusCheck } from '../reducers/status';

class GitButtons extends Component{
  constructor(){
    super();
    this.state = {
      commitMessage: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log(this.state.commitMessage);
    this.props.commitTest(this.state.commitMessage, this.props.userPath);
  }

  handleChange(event) {
    this.setState({ commitMessage: event.target.value });
  }

  render(){
    return(
      <div className="git-methods">
      {/*LOGIC FOR COMMIT BUTTON--ALSO IN MAP STATE AND DISPATCH*/}
        {
          (this.props.status.length !== 0) ?
          (<form onSubmit={this.handleClick}>
            <input value={this.state.commitMessage} onChange={this.handleChange} ></input>
            <button className="btn btn-large btn-primary">
              <span className="icon icon-list-add icon-text"></span>
              Commit
            </button>
          </form>)
          :
          (<button className="btn btn-large btn-default" disabled={true}>
              <span className="icon icon-list-add icon-text"></span>
              Nothing to Commit
          </button>)
        }
        <br />
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
    );
  }
}

/*MOVED ALL LOGIC OVER  FROM COMMIT GRAPH, DONT THINK WE NEED EVERYTHING*/

const mapState = ({ repo, status, commit, userPath }) => ({ repo, status, commit, userPath });

const mapDispatch = (dispatch) => {
  return {
    statusCheck: (rootDir) =>
      dispatch(statusCheck(rootDir)),
    commitTest: (commitMessage, userPath) =>
      dispatch(commitTest(commitMessage, userPath))
  };
};


export default connect(mapState, mapDispatch)(GitButtons);

