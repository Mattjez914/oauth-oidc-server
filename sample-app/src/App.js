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

const startAuth = (event) => {
  axios.get('https://api.alphanetrics/auth/auth', {
    params: {
      client_id: 'test_implicit_app',
      redirect_uri: 'https://alphanetrics.com/redirect',
      response_type: 'id_token',
      scope: 'openid profile',
      nonce: '123',
      state: '321'
    }
  })
  // .then((res) => {
  //   console.log(res)
  //   window.location.href= res.data.url

  // })
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
