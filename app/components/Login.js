import React, { Component } from 'react';
import PropTypes from 'prop-types';

//fsdfsdfds

export default class Login extends Component {
  constructor(){
    super();
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  _inputRef: null;

  handleLogin = () => {
    this.props.onLogin({
      username: this._inputRef.value,
      loggedIn: true
    });
  }

  handleGuestLogin = () => {
    this.props.onLogin({
      username: '',
      loggedIn: true
    });
  }

  render() {
    return (
      <div className="login-div">
        <h2>Git It Done</h2>
        <form>
          <div className="form-group">
            <label>Enter your github username.</label>
            <br/>
            <input ref={(ref) => { this._inputRef = ref; }} type="text" className="form-control" placeholder="steve_jobs_77"/>
            <button className="btn btn-default" onClick={this.handleLogin}>
              <span className="icon icon-login"></span>
            </button>
          </div>
        </form>
        <button className="btn btn-default" onClick={this.handleGuestLogin}>
          Skip
          <span className="icon icon-right-thin icon-text"></span>
        </button>

      </div>
    );
  }
}
