import React, {useState} from 'react';
import { userLogout } from '../actions';
import { connect } from 'react-redux';

const ClientPortal = (props) => {
  const [redirectURL, setRedirectURL] = useState('');

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    console.log('nice')
  }

  return (
    <div className="container" style={{marginTop: "50px"}}>
        <h1>Login successful</h1>
        <div className="row">
          <div className="card col-lg">
            <div className="card-body">
              <h5 className="card-title">Client Registration</h5>
              <form>
                <div className="form-group">
                  <label htmlFor="redirectURL">Redirect URL</label>
                  <input type="text" className="form-control" id="redirectURL" aria-describedby="redirectURL" placeholder="Enter redirect url" value={redirectURL} onChange={(e) => setRedirectURL(e.target.value)}/>
                  <small id="redirectURL" className="form-text text-muted">Input URL to reroute authorization flow grants to</small>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => onLoginSubmit(e)}>Change Redirect URL</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card col-lg">
              <div className="card-body">
                  <h5 className="card-title">Registration Info</h5>
                  <pre>{props.clientDetails}</pre>  
              </ div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => props.userLogout()}>Logout</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { clientDetails: state.clientDetails};
}

export default connect(mapStateToProps, {userLogout})(ClientPortal);
