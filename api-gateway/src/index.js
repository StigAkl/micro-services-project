const fs = require("fs");
const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const configPath = path.join(__dirname, "..", "config", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const app = express();

app.get("/hello", (req, res) => {
  res.status(200).send("Hi!");
});

for (let service in config.services) {
  app.use(
    `/${service}`,
    createProxyMiddleware({
      target: config.services[service],
      changeOrigin: true,
    })
  );

  app.listen(config.port, () => {
    console.log(`API Gateway listening at http://localhost:${config.port}`);
  });
}
