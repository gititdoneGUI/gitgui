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
    fetch(this.props.userPath, event.target.fetch.value);
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
        <form onSubmit={this.handleFetchClick}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Branch to fetch from..."
              name="fetch"
            />
            <button type="submit" className="btn btn-mini btn-primary">
              <span className="icon icon-down-circled icon-text"></span>
            Submit Fetch
            </button>
          </div>
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

