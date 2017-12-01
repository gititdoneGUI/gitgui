import { connect } from 'react-redux';
import LoggedIn from '../components/LoggedIn';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(userActions, dispatch);
  return {
    onLogout: () => {
      user.login();
      dispatch(push('/'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
