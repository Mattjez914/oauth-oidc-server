import { connect } from 'react-redux';
import { userLogout } from '../actions';
import {  Redirect } from "react-router-dom";

const User = (props) => {
  return (
    <div>
      <h5 className="card-title">Token Info</h5>
      {props.login ?
      <pre>{props.login}</pre>
      :
      <Redirect to="/" />
      }
      <button className="btn btn-primary" onClick={() => props.userLogout()}>Logout</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log('Updated App State:',state);
  let login = state.token ? JSON.stringify(state.token, null, 2) : null;
  return { login };
}

export default connect(mapStateToProps, {userLogout})(User);