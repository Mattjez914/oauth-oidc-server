import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userLogin, submitLogin } from '../actions';


const errorText = {
    color: 'red'
}

const LoginScreen = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLoginSubmit = (event) => {
        // console.log(event)
        event.preventDefault();
        props.submitLogin();
        props.userLogin({username,password});
        // console.log(username,password);
    }

    const errorMessage = () => {
        if (props.error) {
            return (
                <div style={errorText}>
                    {props.error.message}
                </div>
            )
        }
        return
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Client Id</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Registration Access Token</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {errorMessage()}
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={(e) => onLoginSubmit(e)}>Submit</button>
                  <Link to="/signup" className="btn btn-success">Sign up</Link>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { error: state.loginError };
}

export default connect(mapStateToProps, {userLogin, submitLogin})(LoginScreen);