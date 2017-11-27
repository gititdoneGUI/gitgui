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

 

export default class Checkout extends Component {
  render() {
    return (
      <button className="btn btn-large btn-primary">
        <span className="icon icon-switch icon-text"></span>
        Checkout
      </button>
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

