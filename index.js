import express from "express";
const app = express();
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";

app.use(express.json());

app.get("/", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/frontend/landingPage.html`));
});
  
app.use("/public", express.static(`${__dirname}/frontend/public`));




app.get("/api/getData", (req, res) => {
  fs.readFile(`${__dirname}/data/animals.json`, (err, data) => {
    if (err) res.status(500).json({ message: "An error occured!" });

    let parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

app.post("/api/postNewAnimal", (req, res) => {
  try {
    fs.readFile(`${__dirname}/data/animals.json`, (err, data) => {
      if (err) res.status(500).json({ message: "An error occured!" });
      let parsedData = JSON.parse(data);
      if (req.body.name) {
        let newAnimal = { name: req.body.name, id: parsedData.length + 1 };

        parsedData.push(newAnimal);

        fs.writeFile(
          `${__dirname}/data/animals.json`,
          JSON.stringify(parsedData),
          "utf-8",
          (err) => {
            if (err) {
              res
                .status(500)
                .json({ message: "Failed to register new animal!" });
            } else {
              res
                .status(201)
                .json({ message: "Successfully added a new animal!" });
            }
          }
        );
      }
      else  {
        res
                .status(400)
                .json({ message: "bad input!" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unexpected error occured!" });
  }
});

app.patch("/api/v1/editAnAnimal/:id", (req,res) => {
    try {
        fs.readFile(`${__dirname}/data/animals.json`, "utf-8", (err, data) => {
            if(err) res.status(500).json({ message: "An error occured!" });

            let parsedData = JSON.parse(data)
            let selectedAnimal = parsedData.find((element) => element.id == req.params.id)

            selectedAnimal.name = req.body.name

            fs.writeFile(`${__dirname}/data/animals.json`, JSON.stringify(parsedData), "utf-8", (err2) => {
                if(err2) res.status(500).json({ message: "Failed to edit the selected animal" });

                res.status(200).json({ message: "Successfully edited the selected animal!" });
            })

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected error occured!" });
    }
})

app.delete("/api/v1/deleteAnimal/:id", (req,res) => {
    try {
        fs.readFile(`${__dirname}/data/animals.json`, "utf-8", (err, data) => {
            if(err) res.status(500).json({ message: "An error occured!" });

            let parsedData = JSON.parse(data)
            let filteredAnimals = parsedData.filter((element) => element.id != req.params.id)


            fs.writeFile(`${__dirname}/data/animals.json`, JSON.stringify(filteredAnimals), "utf-8", (err2) => {
                if(err2) res.status(500).json({ message: "Failed to delete the selected animal" });

                res.status(200).json({ message: "Successfully deleted the selected animal!" });
            })

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected error occured!" });
    }
})

app.listen(3000, () => {
  console.log("App is listening on port: 3000");
});
