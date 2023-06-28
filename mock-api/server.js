const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const crypto = require("crypto");
const port = 1995;
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post("/auth/login", (req, res) => {
  const { ssn } = req.body;

  const user = router.db.get("users").find({ ssn }).value();

  if (user) {
    return res.status(200).json({
      uid: user.id,
      token: crypto.randomBytes(16).toString("hex"),
    });
  } else {
    return res.status(401).json({ error: "Invalid login credentials" });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
