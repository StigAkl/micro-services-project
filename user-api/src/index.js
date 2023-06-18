const express = require("express");
const port = 3001;
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/usersRoutes");

app.use(morgan("dev"));
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`user service listening at http://localhost:${port}`);
});
