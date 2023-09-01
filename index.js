const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());















app.get("/", (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/frontend/index.html`));
});

app.use("/public", express.static(`${__dirname}/frontend/public`));

app.listen(3000, () => {
  console.log("Express server is running at port: 3000");
  console.log("Click me: http://127.0.0.1:3000/");
});
