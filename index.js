import express from "express"

const app = express()

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

