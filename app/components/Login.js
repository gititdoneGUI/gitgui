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

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>GitHub Username</label>
            <input ref={(ref) => { this._inputRef = ref; }} type="text" className="form-control" placeholder="haxor99"/>
            <button className="btn btn-default" onClick={this.handleLogin}>
              <span className="icon icon-login"></span>
            </button>
          </div>
        </form>

      </div>
    );
  }
}
