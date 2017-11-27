import React, { Component } from 'react';
import { connect } from 'react-redux';
import { branch } from '../reducers/branch';

class Branch extends Component {

  constructor(props) {
    super(props);
    
    this.handleBranchClick = this.handleBranchClick.bind(this);
  }

  handleBranchClick(event) {
    event.preventDefault();
    // console.log(branch(this.props.userPath));
    this.props.branch(this.props.userPath);
  }

 

  render() {
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


const mapState = ({userPath }) => ({
  userPath
});

const mapDispatch = (dispatch) => {
  return {
    branch: (path) => 
      dispatch(branch(path))
  }; 
};


export default connect(mapState, mapDispatch)(Branch);

