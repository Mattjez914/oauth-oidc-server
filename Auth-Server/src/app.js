// const express = require('express');
// const path = require('path');
// const	app	= express();
const cors = require('cors');
const path = require('path');

const findAccount = (adapter) => {
  const account = new adapter('Account').coll();
}

module.exports = async function (app) {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'https://test.com:3000');
  //   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  // var whitelist = ['http://localhost:3000', 'https://alphanetrics.com']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }
  app.use(cors());
  // app.options(cors(corsOptions));

  let adapter;

  if (process.env.MONGODB_URI) {
    adapter = require('./database/mongodb'); // eslint-disable-line global-require
    await adapter.connect();
  }

  const Provider = require('oidc-provider');

  const configuration = require('./config/configuration');

  const findAccount = async (ctx, id) => {
    const accountCollection = adapter.coll('account');

    const account = await accountCollection.findOne( { _id: id });

    return {
      accountId: account._id,
      async claims(use, scope) { return { sub: account._id } }
    };
  }

  const oidc = new Provider(process.env.PROVIDER_URL, { adapter, findAccount, ...configuration });

  // app.use(express.static(path.join(__dirname, '..', '..', 'sample-app', 'build')));

// app.get('/test', (req, res) => {
//     res.send({message: 'This is a test change'})
// });
  require('./routes')(app, oidc, adapter);

  app.use((req, res, next) => { 
    // console.log(req.headers);
    // console.log(res.getHeaders());
    next();
  }, oidc.callback);
  
  // app.get('*', (req, res) => {
  //     res.status(404).json({
  //         message: '404 page not found...',
  //       });
  // });

  return app;
}


// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://test.com:3000');
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// var whitelist = ['http://localhost:3000', 'https://alphanetrics.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));
// app.options(cors(corsOptions));

// const Provider = require('oidc-provider');

// const configuration = require('./config/configuration')

// const oidc = new Provider('http://localhost:3001', configuration);



// app.use(express.static(path.join(__dirname, '..', '..', 'sample-app', 'build')));

// app.get('/test', (req, res) => {
//     res.send({message: 'This is a test change'})
// });



// module.exports = app;