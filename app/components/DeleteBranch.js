import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllBranches, deleteLocalBranch} from '../reducers/branches';

class DeleteBranch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    this.deleteLocalBranch(this.props.userPath, event.target.delete.value);
    this.setState({clicked: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  render() {
    console.log(this.props.getAllBranches(this.props.userPath));
    return (
      <div>
        { !this.state.clicked && <button className="btn btn-large btn-primary" onClick={this.handleSubmit}>
          <span className="icon icon-down-circled icon-text"></span>
        Delete Branch
        </button>}
        { this.state.clicked &&
        <form  className="form-group" onSubmit={this.handleDeleteClick}>
          <label>Branch to delete: </label>
          <input
            type="text"
            className="form-control"
            placeholder="origin/master"
            name="delete"
          />
          <button type="submit" className="btn btn-large btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
            Delete
          </button>
        </form>
        }
      </div>
    );
  }
}

const mapState = ({userPath, branch }) => ({ userPath, branch});
const mapDispatch = (dispatch) => {
  return {
    deleteLocalBranch: (path, branchName) =>
      dispatch(deleteLocalBranch(path, branchName)),
    getAllBranches: (path) =>
      dispatch(getAllBranches(path)),

  };
};
export default connect(mapState, mapDispatch)(DeleteBranch);




