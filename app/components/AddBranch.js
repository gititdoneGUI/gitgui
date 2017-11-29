import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkoutLocalBranch } from '../reducers/branches';
import { getAllLocalBranches } from '../reducers/localBranch';


class AddBranch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false,
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps(newProps) {
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllLocalBranches(newProps.userPath);
      this.setState({clicked: false});
    }

  }


  handleAddClick(event) {
    event.preventDefault();
    this.props.checkoutLocalBranch(this.props.userPath, event.target.branch.value);
    this.props.getAllLocalBranches(this.props.userPath);    
    this.setState({clicked: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }


  render() {
    return (
      <div>
        { !this.state.clicked && <button className="btn btn-large btn-primary" onClick={this.handleSubmit}>
          <span className="icon icon-down-circled icon-text"></span>
        Add Branch
        </button>}
        { this.state.clicked &&
        <form  className="form-group" onSubmit={this.handleAddClick}>
          <label>Name of New Branch: </label>
          <input
            type="text"
            className="form-control"
            name="branch"
          />
          <button type="submit" className="btn btn-large btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
            Add and Checkout
          </button>
        </form>
        }
      </div>
    );

  }
}

const mapState = ({userPath, localBranch}) => ({ userPath, localBranch});
const mapDispatch = (dispatch) => {
  return {
    checkoutLocalBranch: (path, branchName) =>
      dispatch(checkoutLocalBranch(path, branchName)),
    getAllLocalBranches: (path) =>
      dispatch(getAllLocalBranches(path))

  };
};
export default connect(mapState, mapDispatch)(AddBranch);



