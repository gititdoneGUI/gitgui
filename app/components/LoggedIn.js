import React, { Component } from "react";


export default class LoggedIn extends Component {


  handleLogOut = () => {
    this.props.onLogout({
      username: '',
      loggedIn: false
    });
  };
  render() {
    return (
      <div>
        <h2>Logged in as {this.props.user.username}</h2>
         <button onClick={this.handleLogOut}>Log Out</button> 
      </div>
    );
  }
}


