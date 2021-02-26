const express = require('express');
// const path = require('path');
const	app	= express();

// app.use(require('cors')());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://alphanetrics.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.options('*', cors())

const Provider = require('oidc-provider');

const configuration = {

  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
  },
  formats: {
    AccessToken: 'jwt',
  },
  clients: [{
      client_id: 'test_implicit_app',
      grant_types: ['implicit'],
      response_types: ['id_token'],
      redirect_uris: ['https://alphanetrics.com/redirect'],
      token_endpoint_auth_method: 'none'
  }],
  scopes: ['api'],
  claims: {
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo']
  }
}

const oidc = new Provider('http://localhost:3001', configuration);



// app.use(express.static(path.join(__dirname, '..', '..', 'sample-app', 'build')));

// app.get('/test', (req, res) => {
//     res.send({message: 'This is a test change'})
// });

app.use('/', oidc.callback);

// app.get('*', (req, res) => {
//     res.status(404).json({
//         message: '404 page not found...',
//       });
// });

  



module.exports = app;