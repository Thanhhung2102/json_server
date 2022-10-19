const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
// const middlewares = jsonServer.defaults({
//   noCors: true,
// })
server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  // messages: 640
});

// You must apply the middlewares in the following order
server.use(cors());
server.use(rules);
server.use(auth);
server.use((req, res, next) => {
  //     res.setHeader('Access-Control-Allow-Origin: https://assignmentangular.vercel.app','Access-Control-Allow-Methods: GET, POST, PUT')
  //     res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://assignmentweb208.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "POST") {
    req.body.createAt = Date.now();
    req.body.updateAt = Date.now();
  } else if (req.method === "PATCH") {
    req.body.updateAt = Date.now();
  }
  next();
});
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

module.exports = allowCors(handler);
server.use("/api", router);
server.listen(8080, () => {
  console.log("JSON Server is running");
});
