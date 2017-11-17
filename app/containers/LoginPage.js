import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
// import userActions from '../actions/user';
import {userLogin} from '../reducers/user';


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(userLogin, dispatch);
  return {
    onLogin: (data) => {
      user.userLogin(data);
      dispatch(push('/loggedin'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
