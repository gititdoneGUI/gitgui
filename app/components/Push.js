import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from '../reducers/push';
import { getAllRemoteBranches } from '../reducers/remoteBranch';

class Push extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pushClicked: false,
      pushToExistingClicked: false,
      pushToNewClicked: false,
      existing: '',
    };
    this.handlePushClick = this.handlePushClick.bind(this);
    this.handleExistingClick = this.handleExistingClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.pushExisting= this.pushExisting.bind(this);
    this.pushNew= this.pushNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeExisting = this.handleChangeExisting.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userPath !== newProps.userPath) {
      this.props.getAllRemoteBranches(newProps.userPath);
      this.setState({
        pushClicked: false,
        pushToExistingClicked: false,
        pushToNewClicked: false
      });
    }
  }

  pushExisting(event) {
    event.preventDefault();
    push(this.props.userPath, this.state.existing);
    this.setState({
      pushClicked: false,
      pushToExistingClicked: false,
      pushToNewClicked: false
    });
  }

  pushNew(event) {
    event.preventDefault();
    push(this.props.userPath, event.target.pushnew.value);
    this.setState({
      pushClicked: false,
      pushToExistingClicked: false,
      pushToNewClicked: false
    });
  }

  handlePushClick(event) {
    event.preventDefault();
    this.setState({
      pushClicked: true
    });
  }

  handleExistingClick(event) {
    event.preventDefault();
    this.props.getAllRemoteBranches(this.props.userPath);
    this.setState({
      pushToExistingClicked: true,
      pushToNewClicked: false
    });
  }

  handleNewClick(event) {
    event.preventDefault();
    this.setState({
      pushToExistingClicked: false,
      pushToNewClicked: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  handleChangeExisting(event) {
    this.setState({existing: event.target.value});
  }

  render() {
    return (
      <div>
        { !this.state.pushClicked && <button className="btn btn-mini btn-primary" onClick={this.handlePushClick}>
          <span className="icon icon-switch icon-text"></span>
      Push
        </button>}
        { this.state.pushClicked &&
      <div>
        <button className="btn btn-mini btn-primary" onClick={this.handleExistingClick}>
          <span className="icon icon-switch icon-text"></span>
          Push To Existing Remote
        </button>
        <button className="btn btn-mini btn-primary" onClick={this.handleNewClick}>
          <span className="icon icon-switch icon-text"></span>
          Push to New Remote
        </button>
      </div>
        }
        { this.state.pushClicked && this.state.pushToExistingClicked &&
        <form  className="form-group" onSubmit={this.pushExisting}>
          <label>Push To: </label>
          <select value = {this.state.existing} onChange={this.handleChangeExisting}>
            <option></option>
            {
              this.props.remoteBranch.map((branch) =>
                <option key={branch} value={branch}>{branch}</option>
              )
            }
          </select>
          <button type="submit" className="btn btn-mini btn-primary">
            <span className="icon icon-switch icon-text"></span>
          Push
          </button>
        </form>
        }

        { this.state.pushClicked && this.state.pushToNewClicked &&
        <form  className="form-group" onSubmit={this.pushNew}>
          <label>Push To: </label>
          <input
            type="text"
            className="form-control"
            placeholder="origin/branch"
            name="pushnew"
          />
          <button type="submit" className="btn btn-mini btn-primary">
            <span className="icon icon-switch icon-text"></span>
          Push
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
    getAllRemoteBranches: (path) =>
      dispatch(getAllRemoteBranches(path))
  };
};

export default connect(mapState, mapDispatch)(Push);
