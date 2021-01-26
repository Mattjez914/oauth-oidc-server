const	app		= require("./src/app");
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

const server = http.createServer(app);

server.on("listening",() => {
	console.log(`Authentication server is in ${env.parsed.ENVIRONMENT.toLowerCase()} mode and running on port ${env.parsed.PORT}...`)
});

server.listen(port);