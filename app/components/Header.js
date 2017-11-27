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


          <button className="btn btn-mini btn-default pull-right" onClick={this.props.onLogout}>
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
