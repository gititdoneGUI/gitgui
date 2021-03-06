import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkout, checkoutBranch } from '../reducers/branches';
import { getAllLocalBranches } from '../reducers/localBranch';
import { getAllRemoteBranches } from '../reducers/remoteBranch';

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
    this.handleLocalCheckout = this.handleLocalCheckout.bind(this);
    this.handleRemoteCheckout = this.handleRemoteCheckout.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllLocalBranches(newProps.userPath);
      this.props.getAllRemoteBranches(newProps.userPath);
      this.setState({
        checkoutClicked: false,
        checkoutLocalClicked: false,
        checkoutRemoteClicked: false
      });
    }
  }

  handleLocalCheckout(event) {
    event.preventDefault();
    this.props.checkout(this.props.userPath, this.state.value);
    this.props.getAllLocalBranches(this.props.userPath);
    this.setState({
      checkoutClicked: false,
      checkoutLocalClicked: false,
    });
  }

  handleRemoteCheckout(event) {
    event.preventDefault();
    this.props.checkoutBranch(this.props.userPath, event.target.fromRemote.value, this.state.value);
    this.props.getAllRemoteBranches(this.props.userPath);
    this.props.getAllLocalBranches(this.props.userPath);
    this.setState({
      checkoutClicked: false,
      checkoutRemoteClicked: false,
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCheckoutClick(event) {
    event.preventDefault();
    this.setState({checkoutClicked: true});
  }

  handleLocalClick(event) {
    event.preventDefault();
    this.setState({
      checkoutLocalClicked: true,
      checkoutRemoteClicked: false
    });
  }

  handleRemoteClick(event) {
    event.preventDefault();
    this.props.getAllRemoteBranches(this.props.userPath);
    this.setState({
      checkoutLocalClicked: false,
      checkoutRemoteClicked: true
    });  }

  render() {
    return (
      <div>
        { !this.state.checkoutClicked && <button className="btn btn-mini btn-primary" onClick={this.handleCheckoutClick}>
          <span className="icon icon-flow-branch icon-text"></span>
        Checkout Branch
        </button>}
        { this.state.checkoutClicked &&
        <div>
          <button className="btn btn-mini btn-primary" onClick={this.handleLocalClick}>
            <span className="icon icon-flow-branch icon-text"></span>
              Checkout Local Branch
          </button>
          <button className="btn btn-mini btn-primary" onClick={this.handleRemoteClick}>
            <span className="icon icon-flow-branch icon-text"></span>
              Checkout Remote Branch
          </button>
        </div>
        }

        { this.state.checkoutClicked && this.state.checkoutLocalClicked &&
          <form  className="form-group" onSubmit={this.handleLocalCheckout}>
            <select value = {this.state.value} onChange={this.handleChange}>
              <option>Branch to checkout ...</option>
              {
                this.props.localBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <button type="submit" className="btn btn-mini btn-primary">
              <span className="icon icon-flow-branch icon-text"></span>
            Checkout
            </button>
          </form>
        }

        { this.state.checkoutClicked && this.state.checkoutRemoteClicked &&
          <form  className="form-group" onSubmit={this.handleRemoteCheckout}>
            <select value = {this.state.value} onChange={this.handleChange}>
              <option>Branch to Checkout...</option>
              {
                this.props.remoteBranch.map((branch) =>
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <input
              type="text"
              className="form-control"
              name="fromRemote"
              placeholder= "Give this branch a local name..."
            />
            <button type="submit" className="btn btn-mini btn-primary">
              <span className="icon icon-flow-branch icon-text"></span>
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
    getAllRemoteBranches: (path) =>
      dispatch(getAllRemoteBranches(path))
  };
};
export default connect(mapState, mapDispatch)(Checkout);
