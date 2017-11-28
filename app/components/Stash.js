import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stash } from '../reducers/stash';

class Stash extends Component {

  constructor(props) {
    super(props);
    this.handleStashClick = this.handleStashClick.bind(this);
  }

  handleStashClick(event) {
    event.preventDefault();
    stash(this.props.userPath);
  }


  render() {
    return (
      <div>
        <button className="btn btn-large btn-primary" onClick={this.handleStashClick}>
          <span className="icon icon-down-circled icon-text"></span>
          Stash
        </button>
      </div>
    );
  }
}


const mapState = ({userPath }) => ({
  userPath
});


export default connect(mapState, null)(Stash);

