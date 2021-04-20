// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import { useRouteMatch } from "react-router-dom";
import qs from 'qs';
const { REACT_APP_API_URL, REACT_APP_REDIRECT_URL, REACT_APP_CLIENT_ID} = process.env

const App = () => {
  let match = useRouteMatch('/redirect')

  return (
    <div className="App">
      <button onClick={(e)=> startAuth(e)}>Login</button>
      {match ? <AuthCallback match={match} /> : <div />}
    </div>
  );
}

// let apiURL = 'https://api.alphanetrics.com/auth/auth'
// let redirectURL = 'https://alphanetrics.com/redirect'

let apiURL = REACT_APP_API_URL;
let redirectURL = REACT_APP_REDIRECT_URL;
let client_id = REACT_APP_CLIENT_ID;

// let apiURL = 'http://localhost:3001/auth';
// let redirectURL = 'https://test.com:3000/redirect';
// let client_id = 'csoep7TvdsHdutKXHUpHA';

const startAuth = (event) => {
  let authURL = `${apiURL}/auth?client_id=${client_id}&redirect_uri=${redirectURL}&response_type=code%20id_token&scope=openid%20profile%20phone&nonce=123&state=321`
  window.location.href= authURL
  // axios.get(apiURL, {
  //   params: {
  //     client_id: 'test_implicit_app',
  //     redirect_uri: redirectURL,
  //     response_type: 'id_token',
  //     scope: 'openid',
  //     nonce: '123',
  //     state: '321'
  //   }
  // })
  // .then((res) => {
  //   console.log(res)
  //   window.location.href= res.data.url

  // })
}

const AuthCallback = (props) => {
  console.log('redirected');
  let url = window.location.href;
  let urlParams = new URLSearchParams(url);
  console.log(urlParams.toString());
  let questionMark = url.indexOf("=");
  let lastIndex = url.indexOf("&")
  let code = url.slice(questionMark + 1, lastIndex)
  // let code = urlParams.get('code')
  console.log(code);

  fetch(`${apiURL}/token`, { // TODO change to actual DNS
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify({
      code: code,
      client_id: client_id,
      grant_type: 'authorization_code'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
  ;

  // console.log(response)

  // let realmId = urlParams.get('realmId');
  // // let officeId = url.get('realmId');
  // console.log(window.location.href)
  // console.log(code)
  // console.log(realmId)
  // axios.get('http://localhost:3001/qbo/callback' + "?code=" + code + "&realmId=" + realmId + "&officeId=1"  ).then((res) => {

  // })
  return <div>Nice</div>
}

export default App;


// 'http://localhost:3001/auth/auth?client_id=test_implicit_app&redirect_uri=https://test.com:3000/redirect&response_type=id_token&scope=openid%20profile&nonce=123&state=321'