import express from "express"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use("/", (req,res,next) => {
    const ip = req.ip;
    console.log(`Request came from: ${ip}`);
    next()
})

app.get("/", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/frontend/index.html`));
});
app.use("/public", express.static(`${__dirname}/frontend/`));

const data = [
    "first string",
    "second string",
    "third string"
]




app.get("/api/v1/getData", (req, res) => {
    res.json(data)
})







app.listen(3000, () => {
    console.log("The app is running on port 3000");
})

