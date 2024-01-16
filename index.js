import express from "express"
import fs from "fs/promises"

const app = express()

app.use(express.json())

app.use("/", (req,res,next) => {
    console.log(`Request came in, IP: ${req.ip}`);
    next()
})

// app.use("/", (req,res,next) => {
//     if (req.ip == "::ffff:31.46.219.69") {
//         console.log("Banned IP LOL");
//         res.send("Sorry bro you are banned")
//     }
//     else {
//         next()
//     }
// })



app.get("/api/v1/people", async (req,res) => {
    try {
        const unparsedData = await fs.readFile("./data/people.json", "utf-8")
        const data = JSON.parse(unparsedData)

        res.json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Upsz some error happened!" })
    }
})

app.post("/api/v1/people", async (req,res) => {
    try {
        const unparsedData = await fs.readFile("./data/people.json", "utf-8")
        const data = JSON.parse(unparsedData)

        const newPerson = {
            id: data.length != 0 ? data[data.length-1].id + 1 : 1,
            name: req.body.name ,
            module: req.body.module,
            favArea: req.body.favArea,
            age: req.body.age
        }

        data.push(newPerson)

        await fs.writeFile("./data/people.json", JSON.stringify(data), "utf-8")

        res.status(201).json({message: "You successfully registered"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Upsz some error happened!" })
    }
})

app.patch("/api/v1/people/:id", async (req,res) => {
    try {
        const unparsedData = await fs.readFile("./data/people.json", "utf-8")
        const data = JSON.parse(unparsedData)

        const selectedPerson = data.find((nextPerson) => 
            nextPerson.id == req.params.id
        )

        if (!selectedPerson) {
            return res.status(404).json({message: "User not found"})
        }

        selectedPerson.age = req.body.age
        selectedPerson.name = req.body.name
        selectedPerson.favArea = req.body.favArea
        selectedPerson.module = req.body.module

        await fs.writeFile("./data/people.json", JSON.stringify(data), "utf-8")

        res.json({message: "Update was successful"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Upsz some error happened!" })
    }
})

app.listen(3000, () => {
    console.log("App is running on port: 3000");
})