import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';


// dfsdfdsfdsfdfsdfsfsdfsdf
//sdfsdfsd

class Header extends Component{
  constructor(){
    super();
  }


  render(){
    return(
      <header className="toolbar toolbar-header">
        <div className="toolbar-actions">
          <div className="btn-group">
            <button className="btn btn-default">
              <span className="icon icon-home"></span>
            </button>
            <button className="btn btn-default">
              <span className="icon icon-folder"></span>
            </button>
            <button className="btn btn-default active">
              <span className="icon icon-cloud"></span>
            </button>
            <button className="btn btn-default">
              <span className="icon icon-popup"></span>
            </button>
            <button className="btn btn-default">
              <span className="icon icon-shuffle"></span>
            </button>
          </div>
          <button className="btn btn-default">
            <span className="icon icon-home icon-text"></span>
            Filters
          </button>

          <button className="btn btn-default pull-right" onClick={this.props.onLogout}>
            <span className="icon icon-logout icon-text"></span>
            Logout
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(userActions, dispatch);
  return {
    onLogout: () => {
      user.login({
        username: '',
        loggedIn: false
      });
      dispatch(push('/'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
