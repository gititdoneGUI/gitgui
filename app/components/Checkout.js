import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkout, checkoutBranch } from '../reducers/branches';
import { getAllLocalBranches } from '../reducers/localBranch';


class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state={
      checkoutClicked: false,
      checkoutLocalClicked: false,
      checkoutRemoteClicked: false,            
      value: ''
    };
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handleLocalClick = this.handleLocalClick.bind(this);
    this.handleRemoteClick = this.handleRemoteClick.bind(this);

  
    this.handleCheckout = this.handleCheckout.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }


  componentWillReceiveProps(newProps) {
    console.log('props', this.props);
    console.log('newProps', newProps);
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllLocalBranches(newProps.userPath);
      this.setState({clicked: false});
    }
  }

  // handleCheckout(event) {
  //   event.preventDefault();
  //   // this.props.deleteLocalBranch(this.props.userPath, this.state.value);
  //   this.props.getAllLocalBranches(this.props.userPath);    
  //   this.setState({clicked: false});
  // }

  handleChange(event) {
    this.setState({value: event.target.value});    
  }

  handleCheckoutClick(event) {
    event.preventDefault();
    this.setState({checkoutClicked: true});
  }

  handleLocalClick(event) {
    event.preventDefault();
    this.setState({checkoutLocalClicked: true});
  }

  handleRemoteClick(event) {
    event.preventDefault();
    this.setState({checkoutRemoteClicked: true});
  }



  render() {
    return (
      <div>
        { !this.state.checkoutClicked && <button className="btn btn-large btn-primary" onClick={this.handleCheckoutClick}>
          <span className="icon icon-down-circled icon-text"></span>
        Checkout Branch
        </button>}
        { this.state.checkoutClicked &&
        // <form  className="form-group" onSubmit={this.handleDeleteClick}>
        <div>
          <button className="btn btn-large btn-primary" onClick={this.handleLocalClick}>
            <span className="icon icon-down-circled icon-text"></span>
            Checkout Local Branch
          </button>

          <button className="btn btn-large btn-primary" onClick={this.handleRemoteClick}>
            <span className="icon icon-down-circled icon-text"></span>
            Checkout Remote Branch
          </button>
        </div>
        // </form>
        }

        { this.state.checkoutClicked && this.state.checkoutLocalClicked &&
          <form  className="form-group" onSubmit={this.handleCheckout}>
            <label>Branch to Checkout: </label>
            <select value = {this.state.value} onChange={this.handleChange}>
              <option></option>
              {
                this.props.localBranch.map((branch) => 
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <button type="submit" className="btn btn-large btn-primary">
              <span className="icon icon-down-circled icon-text"></span>
            Checkout
            </button>
          </form>
        }

{ this.state.checkoutClicked && this.state.checkoutRemoteClicked &&
          <form  className="form-group" onSubmit={this.handleCheckout}>
            <label>Branch to Checkout: </label>
            <select value = {this.state.value} onChange={this.handleChange}>
              <option></option>
              {
                this.props.remoteBranch.map((branch) => 
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <button type="submit" className="btn btn-large btn-primary">
              <span className="icon icon-down-circled icon-text"></span>
            Checkout
            </button>
          </form>
        }




      </div>
    );

  }
}

const mapState = ({userPath, localBranch, remoteBranch}) => ({ userPath, localBranch, remoteBranch});
const mapDispatch = (dispatch) => {
  return {
    checkout: (path, branchName) =>
      dispatch(checkout(path, branchName)),
    checkoutBranch: (path, branchName, startPoint) =>
      dispatch(checkoutBranch(path, branchName, startPoint)),
    getAllLocalBranches: (path) =>
      dispatch(getAllLocalBranches(path)),

  };
};
export default connect(mapState, mapDispatch)(Checkout);


// export default class Checkout extends Component {
//   render() {
//     return (
//       <button className="btn btn-large btn-primary">
//         <span className="icon icon-switch icon-text"></span>
//         Checkout
//       </button>
//     );
//   }
// }




