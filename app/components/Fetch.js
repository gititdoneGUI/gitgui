import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch , fetchALL} from '../reducers/fetch';

class Fetch extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false,
    };
    this.handleFetchClick = this.handleFetchClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFetchClick(event) {
    event.preventDefault();
    if(event.target.fetchall.value)
    {
      fetchALL(this.props.userPath);
    }
    else if (event.target.or.value == 'Origin' ||  event.target.or.value == 'origin' )
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
          <span className="icon icon-right icon-text"></span>
        Fetch
        </button>}

        { this.state.clicked &&

        <form onSubmit={this.handleFetchClick}>
          <div id="fetch-form" className="form-group">
          <input
            type="text"
            className="form-control"
              placeholder="Origin/Remote"
            name="or"
          />
          <input
            type="text"
            className="form-control"
              placeholder="Branch to fetch from"
            name="fetch"
          />
          <div className="fetch-all-container">
          <input
            type="checkbox"
            className="form-control"
            name="fetchall"
            id="fetch-all"
          />
          <label htmlFor="fetch-all">
          Fetch All
          </label>
          </div>
          <div>
          <button type="submit" className="btn btn-mini btn-primary">
            <span className="icon icon-right icon-text"></span>
            Submit Fetch
          </button>
          </div>
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
