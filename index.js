import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())

app.use("/", (req,res,next) => {
    const ip = req.ip;
    console.log(`Request came from: ${ip}`);
    next()
})

app.get("/", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/frontend/landingPage/index.html`));
})


app.get("/editPage/:id", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/frontend/editPage/index.html`));
})


app.use("/public", express.static(`${__dirname}/frontend/`));


app.get("/api/v1/getData", (req, res) => {
    try {
        fs.readFile(`${__dirname}/data/people.json`, (err, unparsedData) => {
            if (err) {
               return res.status(500).json({ message: "Unexpected error occured please try again later!" })
            }
    
            const data = JSON.parse(unparsedData)
    
            res.status(200).json(data)
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected error occured please try again later!" })
    }
})

app.get("/api/v1/getSpecificPerson/:id", (req, res) => {
    try {
        fs.readFile(`${__dirname}/data/people.json`, (err, unparsedData) => {
            if (err) {
               return res.status(500).json({ message: "Unexpected error occured please try again later!" })
            }
    
            const data = JSON.parse(unparsedData)

            const selectedData = data.find((element) => element.id == req.params.id)

            if (!selectedData) {
                return res.status(404).json({ message: "Person not found!" })
            }
            
            res.status(200).json(selectedData)
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected error occured please try again later!" })
    }
})

app.post("/api/v1/register", (req,res) => {
    try {
        fs.readFile(`${__dirname}/data/people.json`, (error, unparsedData) => {
            if (error) {
                return res.status(500).json({ message: "Unexpected error occured please try again later!" })
            }

            const data = JSON.parse(unparsedData)
            
            if (data.length == 0) {
                data.push({ name: req.body.name, age: req.body.age, id: 1 })
            }
            else {
                let nextId = data[data.length-1].id + 1
                data.push({ name: req.body.name, age: req.body.age, id: nextId })
            }
            


            fs.writeFile(`${__dirname}/data/people.json`, JSON.stringify(data), (err) => {
                if (err) {
                    return res.status(500).json({ message: "Unexpected error occured please try again later!" })
                }
    
                res.status(201).json({ message: "Ok, your data have been registered successfully" })
            } )
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected error occured please try again later!" })
    }
})

app.patch("/api/v1/editProfile/:id", (req,res) => {
    try {
        fs.readFile(`${__dirname}/data/people.json`, "utf-8", (error, unparsedData) => {
            if (error) {
                return res.status(500).json({ message: "Unexpected error occured please try again later!" })
            }

            const data = JSON.parse(unparsedData)

            const selectedData = data.find((element) => { return element.id == req.params.id })

            if (!selectedData) {
                return res.status(404).json({ message: "Person not found!" })
            }

            selectedData.name = req.body.name
            selectedData.age = req.body.age

            fs.writeFile(`${__dirname}/data/people.json`, JSON.stringify(data), (err) => {
                if (err) {
                    return res.status(500).json({ message: "Unexpected error occured please try again later!" })
                }

                res.json({message: "The edit way successful"})
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected error occured please try again later!" })
    }
})







app.listen(3000, () => {
    console.log("The app is running on port 3000");
})

