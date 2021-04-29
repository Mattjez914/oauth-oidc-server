import React, {useState} from 'react';
import { Link } from "react-router-dom";
// import ClientRegForm from './ClientRegForm';

const Signup = (props) => {
  const [redirectURL, setRedirectURL] = useState('');
  const [registeredClient, setRegisteredClient] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const onLoginSubmit = async (event) => {
    console.log(redirectURL)
    event.preventDefault();
    const response = await fetch(`https://api.alphanetrics.com/reg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "grant_types": ["implicit", "authorization_code"],
        "response_types": ["code id_token"],
        "redirect_uris": [`${redirectURL}`],
        "token_endpoint_auth_method": "none",
        "revocation_endpoint_auth_method": "none"
      })
    }).then(res => {
      setResponseError(res.ok ? null : res.statusText);
      return res.json();
    })

    console.log(response);

    let jsonResponse = JSON.stringify(response, null, 2)
    setRegisteredClient(jsonResponse);

    const data = new Blob([jsonResponse], { type: 'application/json' });

    // this part avoids memory leaks
    if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data))

    // const clientInfo = Object.getOwnPropertyNames(response).map((key,i) => 
    // <li className="list-group-item" key={`${key}${i}`}>{key}: {response[key]}</li>
    // );

    // setRegisteredClient(clientInfo);

  }

  return (
    <div className="container" style={{marginTop: "50px"}}>
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
              <button type="submit" className="btn btn-primary" onClick={(e) => onLoginSubmit(e)}>Register New Client</button>
              <Link to="../" className="btn btn-danger">Back to Login</Link>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        {registeredClient &&
          <div className="card col-lg">
            <div className="card-body">
              <h5 className="card-title">Registration Info</h5>
              <small className="form-text text-muted">Save or download this info, you will not see this info again</small> 
              <pre>{registeredClient}</pre>
              {!responseError &&
                <a download="clientRegistration.json" href={downloadLink} className="btn btn-warning">Download Registration Info</a>
              }   
            </ div>
          </div>
        }
      </div>
    </div>
  )
}

export default Signup