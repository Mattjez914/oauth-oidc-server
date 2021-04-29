import React, {useState} from 'react';

const ClientRegForm = (props) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="redirectURL">Redirect URL</label>
        <input type="text" className="form-control" id="redirectURL" aria-describedby="redirectURL" placeholder="Enter redirect url" />
        <small id="redirectURL" className="form-text text-muted">Input URL to reroute authorization flow grants to</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <label htmlFor="grantTypes">Grant Types</label>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="implicit" />
        <label className="form-check-label" htmlFor="implicit">implicit</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="authorizationCode" />
        <label className="form-check-label" htmlFor="authorizationCode">authorization code</label>
      </div>
      <label htmlFor="grantTypes">Grant Types</label>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="implicit" />
        <label className="form-check-label" htmlFor="implicit">implicit</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="authorizationCode" />
        <label className="form-check-label" htmlFor="authorizationCode">authorization code</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ClientRegForm