import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from './LoginScreen';
import Signup from './Signup';
import ClientPortal from './ClientPortal';
import { userLogout } from '../actions';

class App extends React.Component {
    // state = { error: null};

    // onLoginSubmit = async (username, password) => {
    //     // console.log(username,password);
    //     this.setState({formSubmitted: true});
    //     // setTimeout(() => this.setState({login: true}), 4000);
    //     let response;
    //     try {
    //         response = await axios.post('http://localhost:3001/api/login',{}, {
    //             auth: {
    //                 username: username,
    //                 password: password
    //             }
    //         });
    //         console.log(response);
    //         this.setState({login: true});
    //     }
    //     catch (err) {
    //         let errorStatus = err.response.status;
    //         console.log(errorStatus);
    //         if (errorStatus === 401) this.setState({login: false, formSubmitted: false, error: errorStatus})
    //     }
    // }

    
    renderContent() {
        // console.log('State login:',this.props.login)
        if (!this.props.login && !this.props.formSubmitted) {
            return (
                <div className="container" style={{marginTop: "50px"}}>
                    <div className="row">
                        <div className="col-lg">
                            <LoginScreen/>
                        </div>
                    </div>
                </div>
             );
        }

        if (!this.props.login && this.props.formSubmitted) {
            return <p>Loading...</p>;
        }

        return <ClientPortal />
    }

    render() {
         return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.renderContent()}
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </Router>
         );
    }
}

const mapStateToProps = (state) => {
    // console.log('Updated App State:',state);
    let login = state.token ? true : false;
    // console.log('login:',login);
    return { login, formSubmitted: state.loginSubmitted,  clientDetails: state.clientDetails};
}

export default connect(mapStateToProps, {userLogout})(App);