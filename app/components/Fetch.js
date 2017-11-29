import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch , fetchALL} from '../reducers/fetch';
import { getAllRemoteBranches } from '../reducers/remoteBranch';


class Fetch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false,
      checked: false,
      value: ''
    };
    this.handleFetchClick = this.handleFetchClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  handleFetchClick(event) {
    event.preventDefault();
    console.log(this.props.userPath);    
    console.log(this.state.value);
    console.log(this.state.checked);
  
    if(this.state.checked)
    {
      fetchALL(this.props.userPath);
    }
    else {
      console.log('in else');
      fetch(this.props.userPath, this.state.value);
    }
    this.setState({clicked: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  handleChange(event) {
    this.setState({value: event.target.value});    
  }

  toggleCheck(event) {
    event.preventDefault();    
    if (this.state.checked) {
      this.setState({checked: false});
    }
    else {
      this.setState({checked: true});
    }
  }

  render() {
    return (
      <div>
        { !this.state.clicked && <button className="btn btn-large btn-primary" onClick={this.handleSubmit}>
          <span className="icon icon-down-circled icon-text"></span>
        Fetch
        </button>}

        { this.state.clicked &&

        <form onSubmit={this.handleFetchClick}>
          <div id="fetch-form" className="form-group">
            <label>Remote Branch to Fetch: </label>

            <select value = {this.state.value} onChange={this.handleChange}>
              <option></option>
              {
                this.props.remoteBranch.map((branch) => 
                  <option key={branch} value={branch}>{branch}</option>
                )
              }
            </select>
            <div className="fetch-all-container">
              <input
                type="checkbox"
                className="form-control"
                name="fetchall"
                id="fetch-all"
                checked={this.state.checked}
                onChange={this.toggleCheck}
              />
              <label htmlFor="fetch-all">
          Fetch All
              </label>
            </div>
            <div>
              <button type="submit" className="btn btn-mini btn-primary">
                <span className="icon icon-down-circled icon-text"></span>
             Fetch
              </button>
            </div>
          </div>
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

export default connect(mapState, mapDispatch)(Fetch);
