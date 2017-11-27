import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch } from '../reducers/fetch';

class Fetch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false
    };
    this.handleFetchClick = this.handleFetchClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFetchClick(event) {
    event.preventDefault();
    if (event.target.or.value == 'Origin' ||  event.target.or.value == 'origin' )
      fetch(this.props.userPath, event.target.fetch.value);
    else
      fetch(event.target.or.value, event.target.fetch.value);
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
        Fetch
        </button>}
        { this.state.clicked &&
        <form  className="form-group" onSubmit={this.handleFetchClick}>
          <label> Origin/Remote : </label>
          <input
            type="text"
            className="form-control"
            placeholder="haxor99"
            name="or"
          />

          <label>Branch to fetch from : </label>
          <input
            type="text"
            className="form-control"
            placeholder="haxor99"
            name="fetch"
          />
          <button type="submit" className="btn btn-large btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
            Submit Fetch
          </button>
        </form>
        }
      </div>
    );
  }
}


const mapState = ({userPath }) => ({
  userPath
});


export default connect(mapState, null)(Fetch);

