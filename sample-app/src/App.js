import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

const App = () => {
  let match = useRouteMatch('/redirect')

  return (
    <div className="App">
      <button onClick={(e)=> startAuth(e)}>Login</button>
      {match ? <AuthCallback match={match} /> : <div />}
    </div>
  );
}

let apiURL = 'https://api.alphanetrics.com/auth/auth'
let redirectURL = 'https://alphanetrics.com/redirect'

const startAuth = (event) => {
  let authURL = `${apiURL}?client_id=test_implicit_app&redirect_uri=${redirectURL}&response_type=id_token&scope=openid%20profile&nonce=123&state=321`
  window.location.href= authURL
}

const AuthCallback = (props) => {
  // let url = window.location.href
  // let urlParams = new URLSearchParams(url)
  // let questionMark = url.indexOf("=");
  // let lastIndex = url.indexOf("&")
  // let code = url.slice(questionMark + 1, lastIndex)
  // let state = urlParams.get('state')
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
