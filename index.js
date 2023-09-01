const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());


app.get("/api/v1/getPeopleData", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) res.status(500).json({ message: "Upss, something went wrong, please try again later!" });
        const items = JSON.parse(data)
        res.json(items)
    })
})

app.post("/api/v1/addNewPerson", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
        }

        const allData = JSON.parse(data)
        const newData = {
            name: req.body.name,
            age: req.body.age
        }
        allData.push(newData)

        fs.writeFile('./data/people.json', JSON.stringify(allData), (err) => {
            if (err) {
                return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
            }

            return res.json({ message: "Hurray the data have been saved!" })
        })
    })
})

app.put("/api/v1/replacePerson/:name", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
        }

        const allData = JSON.parse(data)
        const selectedPerson = allData.find(nextData => nextData.name === req.params.name)
        selectedPerson.name = req.body.name
        selectedPerson.age = req.body.age

        fs.writeFile('./data/people.json', JSON.stringify(allData), (err) => {
            if (err) {
                return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
            }

            return res.json({ message: "Hurray the data have been updated!" })
        })
    })
})

app.patch("/api/v1/changeName/:name", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
        }

        const allData = JSON.parse(data)
        const selectedPerson = allData.find(nextData => nextData.name === req.params.name)
        selectedPerson.name = req.body.name

        fs.writeFile('./data/people.json', JSON.stringify(allData), (err) => {
            if (err) {
                return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
            }

            return res.json({ message: "Hurray the data have been saved!" })
        })
    })
})

app.delete("/api/v1/deletePerson/:name", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
        }

        const allData = JSON.parse(data)
        const newArray = allData.filter(nextData => nextData.name !== req.params.name)

        fs.writeFile('./data/people.json', JSON.stringify(newArray), (err) => {
            if (err) {
                return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
            }

            return res.json({ message: "Hurray the data have been deleted!" })
        })
    })
})


app.get("/", (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/frontend/index.html`));
});

app.get("/hmm", (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/frontend/hmm.html`));
});

app.get("/something", (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/frontend/something.html`));
});

app.use("/public", express.static(`${__dirname}/frontend/public`));

app.listen(3000, () => {
  console.log("Express server is running at port: 3000");
  console.log("Click me: http://127.0.0.1:3000/");
});
