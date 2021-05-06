import React from 'react';
import { connect } from 'react-redux';
import {   Switch, Route, Redirect } from "react-router-dom";
import AuthCallback from './AuthCallback';
import User from './User';
const { REACT_APP_API_URL, REACT_APP_REDIRECT_URL, REACT_APP_CLIENT_ID} = process.env

const App = (props) => {
  let apiURL = REACT_APP_API_URL;
  let redirectURL = REACT_APP_REDIRECT_URL;
  let client_id = REACT_APP_CLIENT_ID;

  const startAuth = (event) => {
    let authURL = `${apiURL}/auth?client_id=${client_id}&redirect_uri=${redirectURL}&response_type=code%20id_token&scope=openid%20profile%20phone&nonce=123&state=321`
    window.location.href= authURL
  }

  return (
      <div className="container" style={{marginTop: "50px"}}>
        <div className="row">
          <div className="col-lg">
            <div className="card">
              <div className="card-body">
              <h2 className="card-title">Welcome to Sample App</h2>
                <Switch>
                  <Route exact path="/">
                    {props.login ?
                    <Redirect to="/user"/>
                    :
                    <button className="btn btn-primary" onClick={(e)=> startAuth(e)}>Connect with Alphanetrics</button>
                    }
                  </Route>
                  <Route path="/redirect">
                    <AuthCallback />
                  </Route>
                  <Route path="/user">
                    <User />
                  </Route>
                  </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => {
  // console.log('Updated App State:',state);
  let login = state.token ? true : false;
  return { login };
}

export default connect(mapStateToProps)(App);

