const express = require('express');
// const path = require('path');
const	app	= express();

const Provider = require('oidc-provider');

const configuration = {
  // claims: {
  //     email: ['email', 'email_verified'],
  //     phone: ['phone_number', 'phone_number_verified'],
  //     profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo']
  // },
// ... see the available options in Configuration options section
  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
  },
  formats: {
    AccessToken: 'jwt',
  },
  clients: [{
      client_id: 'test_implicit_app',
      client_secret: 'bar',
      // grant_types: ['implicit'],
      // response_types: ['id_token'],
      redirect_uris: ['https://alphanetrics.com/redirect'],
      // + other client properties
  }],
  scopes: ['api'],
  async findById(ctx, id) {
      return {
          accountId: id,
          async claims() { return { sub: id }; },
      };
  }
}

const oidc = new Provider('http://localhost:3001', configuration);

app.use(require('cors')());

// app.use(express.static(path.join(__dirname, '..', '..', 'sample-app', 'build')));

app.get('/test', (req, res) => {
    res.send({message: 'This is a test change'})
});

app.use('/auth', oidc.callback);

app.get('*', (req, res) => {
    res.status(404).json({
        message: '404 page not found...',
      });
});

  



module.exports = app;