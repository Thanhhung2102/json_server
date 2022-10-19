const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

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
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

server.use("/api", router);
server.listen(8080, () => {
  console.log("JSON Server is running");
});
