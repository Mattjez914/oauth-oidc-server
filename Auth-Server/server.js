"use strict";
const express = require('express');
const	app		= express();
const http	= require("http");
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

app.set("port",port);

let server

(async () => {
	let initializedApp = await require('./src/app')(app);
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

