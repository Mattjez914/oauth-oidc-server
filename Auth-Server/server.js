"use strict";
const express = require('express');
const	app		= express();
const http	= require("http");
const path = require('path');
const env		= require("dotenv").config();

const normalizePort = (val) => {
	const port = parseInt(val, 10);

	// named pipe
	if (isNaN(port))
		return val;

	// port number
	if (port >= 0)
		return port;

	return false;
};

const port = normalizePort(env.parsed.PORT);

const staticPath = path.resolve(__dirname, '../client-registration/build');
console.log('CURRENT DIRECTORY: ',path.resolve(staticPath, './index.html'));

app.set("port",port);

app.use(express.static(staticPath));

// app.get("/register", (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client-registration/build/index.html'));
// });

// app.use(express.static(path.join(__dirname, "build")));

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

let server

(async () => {
	let initializedApp = await require('./src/app')(app);
	initializedApp.get("*", (req, res) => {
    res.sendFile(path.resolve(staticPath, './index.html'));
	});
	
	server = http.createServer(initializedApp);

	server.on("listening",() => {
		console.log(`Authentication server is in ${env.parsed.ENVIRONMENT.toLowerCase()} mode and running on port ${env.parsed.PORT}...`)
	});
	
	server.listen(port);
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});

