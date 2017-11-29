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
    this.props.stash(this.props.userPath);
  }


  render() {
    return (
      <div>
        { 
          (this.props.status.length !== 0) ?
            (<button className="btn btn-large btn-primary" onClick={this.handleStashClick}>
              <span className="icon icon-down-circled icon-text"></span>
          Stash
            </button>): (<button className="btn btn-large btn-default" disabled={true}>
              <span className="icon icon-list-add icon-text"></span>
            Nothing to Stash
            </button>)
     
        }
      </div>
    );
  }
}


const mapState = ({userPath,status }) => ({
  userPath,
  status
});

const mapDispatch = dispatch => {
  return {
    stash: path => {
      dispatch(stash(path));
    }
  };
};

export default connect(mapState, mapDispatch)(Stash);

