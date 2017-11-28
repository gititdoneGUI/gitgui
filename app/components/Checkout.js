import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { branch } from '../reducers/branch';

// class Branch extends Component {

//   constructor(props) {
//     super(props);
    
//     this.handleBranchClick = this.handleBranchClick.bind(this);
//   }

//   handleBranchClick(event) {
//     event.preventDefault();
//     this.props.branch(this.props.userPath);
//   }

 

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



// export default connect(mapState, mapDispatch)(Branch);

