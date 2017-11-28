import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteLocalBranch} from '../reducers/branches';
import { getAllLocalBranches } from '../reducers/localBranch';


class DeleteBranch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBranchClick = this.handleBranchClick.bind(this);
    
  }



  handleDeleteClick(event) {
    event.preventDefault();
    // this.deleteLocalBranch(this.props.userPath, event.target.delete.value);
    this.setState({clicked: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  handleBranchClick(event) {
    event.preventDefault();
    this.props.getAllLocalBranches(this.props.userPath);
    console.log(this.props.getAllLocalBranches(this.props.userPath));
  }


  render() {
    // return (
    //   <div>
    //     { !this.state.clicked && <button className="btn btn-large btn-primary" onClick={this.handleSubmit}>
    //       <span className="icon icon-down-circled icon-text"></span>
    //     Delete Branch
    //     </button>}
    //     { this.state.clicked &&
    //     <form  className="form-group" onSubmit={this.handleDeleteClick}>
    //       <label>Branch to delete: </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         placeholder="origin/master"
    //         name="delete"
    //       />
    //       <button type="submit" className="btn btn-large btn-primary">
    //         <span className="icon icon-down-circled icon-text"></span>
    //         Delete
    //       </button>
    //     </form>
    //     }
    //   </div>
    // );
    return (
      <div>
        <button className="btn btn-large btn-primary"  onClick={this.handleBranchClick}>
          <span className="icon icon-flow-branch icon-text"></span>
        Branch
        </button>
      </div>
    );

  }
}

const mapState = ({userPath}) => ({ userPath});
const mapDispatch = (dispatch) => {
  return {
    deleteLocalBranch: (path, branchName) =>
      dispatch(deleteLocalBranch(path, branchName)),
    getAllLocalBranches: (path) =>
      dispatch(getAllLocalBranches(path)),

  };
};
export default connect(mapState, mapDispatch)(DeleteBranch);




