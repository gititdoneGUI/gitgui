import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pull } from '../reducers/pull';

class Pull extends Component {

  constructor(props) {
    super(props);
    this.handlePullClick = this.handlePullClick.bind(this);
  }

  handlePullClick(event) {
    event.preventDefault();
    pull(this.props.userPath, event.target.branch.value);
  }

  render() {
    return (

      <form onSubmit={this.handlePullClick} className="form-group">
        <label>Branch to pull from : </label>
        <input
          type="text"
          className="form-control"
          placeholder="haxor99"
          name="branch"
        />
        <button className="btn btn-large btn-primary">
          <span className="icon icon-down-circled icon-text"></span>
        Pull
        </button>
      </form>

    
    );
  }
}


const mapState = ({userPath }) => ({
  userPath
});


export default connect(mapState, null)(Pull);

