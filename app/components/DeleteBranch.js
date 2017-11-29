import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteLocalBranch } from '../reducers/branches';
import { getAllLocalBranches } from '../reducers/localBranch';


class DeleteBranch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false,
      value: ''
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }


  componentWillReceiveProps(newProps) {
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllLocalBranches(newProps.userPath);
      this.setState({clicked: false});
    }
  }


  handleDeleteClick(event) {
    event.preventDefault();
    this.props.deleteLocalBranch(this.props.userPath, this.state.value);
    this.props.getAllLocalBranches(this.props.userPath);
    this.setState({clicked: false});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }


  render() {
    return (
      <div>
        { !this.state.clicked && <button className="btn btn-mini btn-primary" onClick={this.handleSubmit}>
          <span className="icon icon-down-circled icon-text"></span>
        Delete Branch
        </button>}
        { this.state.clicked &&
        <form  onSubmit={this.handleDeleteClick}>
          <div  className="form-group">
          <select value = {this.state.value} onChange={this.handleChange}>
            <option>Branch to delete...</option>
            {
              this.props.localBranch.map((branch) =>
                <option key={branch} value={branch}>{branch}</option>
              )
            }
          </select>
          <button type="submit" className="btn btn-mini btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
            Delete
          </button>
          </div>
        </form>
        }
      </div>
    );

  }
}

const mapState = ({userPath, localBranch}) => ({ userPath, localBranch});
const mapDispatch = (dispatch) => {
  return {
    deleteLocalBranch: (path, branchName) =>
      dispatch(deleteLocalBranch(path, branchName)),
    getAllLocalBranches: (path) =>
      dispatch(getAllLocalBranches(path)),

  };
};
export default connect(mapState, mapDispatch)(DeleteBranch);




