const restify = require("restify");
const send = require("send");
const fs = require("fs");

//Create HTTP server.
const server = restify.createServer({
  key: fs.readFileSync(process.env.SSL_KEY_FILE),
  certificate: fs.readFileSync(process.env.SSL_CRT_FILE),
  formatters: {
    "text/html": function (req, res, body) {
      return body;
    },
  },
});

server.get(
  "/*",
  restify.plugins.serveStatic({
    directory: __dirname + "/static",
  })
);

server.listen(process.env.port || process.env.PORT || 3333, function () {
  console.log(`\n${server.name} listening to ${server.url}`);
});

// Adding tabs to our app. This will setup routes to various views
// Setup home page
server.get("/", (req, res, next) => {
  send(req, "src/views/hello.html").pipe(res);
});

// Setup the static tab
server.get("/tab", (req, res, next) => {
  send(req, "src/views/hello.html").pipe(res);
});
