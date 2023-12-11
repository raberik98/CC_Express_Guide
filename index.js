import express from "express";
const app = express();
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";

// app.use(express.json());





console.log(path.join(__dirname + "/frontend/index.html"));
// app.listen(3000, () => {
//   console.log("App is listening on port: 3000");
// });
