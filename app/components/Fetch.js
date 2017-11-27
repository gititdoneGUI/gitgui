import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch } from '../reducers/fetch';

class Fetch extends Component {

  constructor(props) {
    super(props);
    this.handleFetchClick = this.handleFetchClick.bind(this);
  }

  handleFetchClick(event) {
    event.preventDefault();
    fetch(this.props.userPath, event.target.fetch.value);
  }

  render() {
    return (

      <form  className="form-group" onSubmit={this.handleFetchClick}>
        <label>Branch to fetch from : </label>
        <input
          type="text"
          className="form-control"
          placeholder="haxor99"
          name="fetch"
        />
        <button className="btn btn-large btn-primary">
          <span className="icon icon-down-circled icon-text"></span>
          Fetch
        </button>
      </form>
    );
  }
}


const mapState = ({userPath }) => ({
  userPath
});


export default connect(mapState, null)(Fetch);

