const express = require('express');
const path = require('path');
const	app	= express();

const Provider = require('oidc-provider');

app.use(express.static(path.join(__dirname, '..', '..', 'sample-app', 'build')));

app.get('/test', (req, res) => {
    res.send({message: 'This is a test change'})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'sample-app', 'build', 'index.html'));
});



module.exports = app;