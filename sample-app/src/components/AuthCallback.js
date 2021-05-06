import { connect } from 'react-redux';
import { authCallback } from '../actions';
import {  Redirect } from "react-router-dom";

const AuthCallback = (props) => {
  // console.log('redirected');
  let url = window.location.href;
  let questionMark = url.indexOf("=");
  let lastIndex = url.indexOf("&")
  let code = url.slice(questionMark + 1, lastIndex)
  props.authCallback(code);
  // console.log(code);

  return (
    <Redirect 
      to="/user"
    />
  );
}

export default connect(null, {authCallback})(AuthCallback);