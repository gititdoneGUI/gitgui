import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
      username: 'Guest',
      loggedIn: true
    });
  }

  render() {
    return (
      <div className="login-div">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>Enter your github username.</label>
            <br/>
            <input ref={(ref) => { this._inputRef = ref; }} type="text" className="form-control" placeholder="haxor99"/>

            <button className="btn btn-default" onClick={this.handleLogin}>
            <span className="icon icon-login"></span>
            </button>
          </div>
        </form>
        <h3>OR</h3>
        <br />
        <button className="btn btn-default" onClick={this.handleGuestLogin}>
          Continue as guest
        </button>

      </div>
    );
  }
}
