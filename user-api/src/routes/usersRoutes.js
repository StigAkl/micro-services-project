const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from /users");
});

router.get("/profile", (req, res) => {
  res.send("Hello from /users/profile");
});

module.exports = router;
