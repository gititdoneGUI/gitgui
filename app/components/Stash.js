import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stash } from '../reducers/stash';

class Stash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stashMessage: '',
      clicked: false
    };
    this.handleStashClick = this.handleStashClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleStashClick(event) {
    event.preventDefault();
    this.setState({clicked: true});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.stash(this.props.userPath, this.state.stashMessage);
    this.setState({clicked: false});
  }

  handleChange(event) {
    this.setState({ stashMessage: event.target.value });
  }

  render() {
    return (
      <div>
        {
          (this.props.status.length !== 0) ?
            (<button className="btn btn-mini btn-primary" onClick={this.handleStashClick}>
              <span className="icon icon-pause icon-text"></span>
          Stash
            </button>): (<button className="btn btn-mini btn-default" disabled={true}>
              <span className="icon icon-list-add icon-text"></span>
            Nothing to Stash
            </button>)
        }
        {
          this.state.clicked &&
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input className='form-control' value={this.state.stashMessage} onChange={this.handleChange} placeholder="Optional message..."></input>
                <button type='submit' className="btn btn-mini btn-primary">
                  <span className="icon icon-list-add icon-text"></span>
            Stash
                </button>
              </div>
            </form>
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
    stash: (path, message) => {
      dispatch(stash(path, message));
    }
  };
};

export default connect(mapState, mapDispatch)(Stash);

