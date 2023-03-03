const restify = require("restify");
const send = require("send");
const fs = require("fs");
const { Client } = require("@microsoft/microsoft-graph-client");
require('isomorphic-fetch');

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

server.use(restify.plugins.bodyParser());

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

server.get("/auth-start", (req, res, next) => {
  send(req, "src/views/auth-start.html").pipe(res);
});

server.get("/auth-end.html", (req, res, next) => {
  send(req, "src/views/auth-end.html").pipe(res);
});

server.post("/getUserInfo", async (req, res) => {
  console.log(req.body);
  const accessToken = req.body.token;
  console.log(accessToken);
  try {
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken.trim());
      },
    });
    const result = await client.api("/me").get();
    res.json(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
