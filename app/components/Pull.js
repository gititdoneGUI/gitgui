import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pull } from '../reducers/pull';

class Pull extends Component {

  constructor(props) {
    super(props);
    this.state={
      clicked: false
    };
    this.handlePullClick = this.handlePullClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePullClick(event) {
    event.preventDefault();
    pull(this.props.userPath, event.target.branch.value);
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
        Pull
        </button>}
        { this.state.clicked &&
        <form onSubmit={this.handlePullClick} className="form-group">
          <label>Branch to pull from : </label>
          <input
            type="text"
            className="form-control"
            placeholder="haxor99"
            name="branch"
          />
          <button type="submit" className="btn btn-large btn-primary">
            <span className="icon icon-down-circled icon-text"></span>
        Submit Pull
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


export default connect(mapState, null)(Pull);

