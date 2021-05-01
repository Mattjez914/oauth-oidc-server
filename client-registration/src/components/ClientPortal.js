import React, {useState} from 'react';
import { userLogout, updateClientRedirect } from '../actions';
import { connect } from 'react-redux';

const ClientPortal = (props) => {
  const clientDetails = JSON.parse(props.clientDetails);
  const [redirectURL, setRedirectURL] = useState(clientDetails.redirect_uris[0]);
  const [responseError, setResponseError] = useState(null);

  const onChangeSubmit = async (event) => {
    event.preventDefault();
    let error = null;

    const response = await fetch(`https://api.alphanetrics.com/reg/${clientDetails.client_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({
        "client_id": `${clientDetails.client_id}`, 
        "grant_types": ["implicit", "authorization_code"],
        "response_types": ["code id_token"],
        "redirect_uris": [`${redirectURL}`],
        "token_endpoint_auth_method": "none",
        "revocation_endpoint_auth_method": "none"
      })
    }).then(res => {
      error = res.ok ? null : res.statusText;
      return res.json();
    });

    if (!error) {
      setResponseError(null);
      props.updateClientRedirect(response);
    }
    else {
      setResponseError(response.error_description);
    }


  }

  const errorText = {
    color: 'red'
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
                  {responseError && <div style={errorText}>{responseError}</div>}
                  <small id="redirectURL" className="form-text text-muted">Input URL to reroute authorization flow grants to</small>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => onChangeSubmit(e)}>Change Redirect URL</button>
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
  return { token: state.token, clientDetails: state.clientDetails};
}

export default connect(mapStateToProps, {userLogout, updateClientRedirect})(ClientPortal);
