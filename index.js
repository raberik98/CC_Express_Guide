// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const app = express();

import express from "express"
const app = express()
import fs from "fs"
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import { fileURLToPath } from "url";

app.use(express.json());
// app.use(express.text())

import personRouter from "./routes/personRouter.js"
app.use("/api/v1", personRouter)


app.get("/", (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/frontend/index.html`));
});

// app.get("/edit", (req, res, next) => {
//   res.sendFile(path.join(`${__dirname}/frontend/edit.html`));
// });

// app.get("/something", (req, res, next) => {
//   res.sendFile(path.join(`${__dirname}/frontend/something.html`));
// });

app.use("/public", express.static(`${__dirname}/frontend/public`));

app.listen(3000, () => {
  console.log("Express server is running at port: 3000");
  console.log("Click me: http://127.0.0.1:3000/");
});
