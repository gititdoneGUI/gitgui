import { connect } from 'react-redux';
import LoggedIn from '../components/LoggedIn';
import { bindActionCreators } from 'redux';
// import userActions from '../actions/user';
import {userLogin} from '../reducers/user';
import { push } from 'react-router-redux';


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { // eslint-disable-line no-unused-vars
  const user = bindActionCreators(userLogin, dispatch);
  return {
    onLogout: () => {
      user.login();
      dispatch(push('/'));
    }
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
