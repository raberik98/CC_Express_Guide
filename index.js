import express from "express";
const app = express();
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";

//Middlewares come to the top of the file
app.use(express.json());

//The endpoints which return static files come to the top
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/frontend/pages/LandingPage/LandingPage.html`)
})
app.get("/registration", (req, res) => {
  res.sendFile(`${__dirname}/frontend/pages/Registration/Registration.html`)
})
app.get("/editProfile/:id", (req, res) => {
  res.sendFile(`${__dirname}/frontend/pages/EditProfile/EditProfile.html`)
})


app.use("/frontend", express.static(`${__dirname}/frontend`));

app.get("/api/getAllData", (req, res) => {
  fs.readFile("./data/people.json", (err, data) => {
    const parsedData = JSON.parse(data)

    res.json(parsedData)
  })
})

app.get("/api/getSpecificData/:id", (req,res) => {
  try {
    fs.readFile("./data/people.json", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Upsz some error occured please try again later!" })
      }

      const parsedData = JSON.parse(data)
      let selectedPerson = parsedData.find((element) => {
        return element.id == req.params.id
      })

      if (!selectedPerson) {
        console.log("Falied to find the person");
        return res.status(500).json({ message: "Upsz some error occured please try again later!" })
      }

      res.json(selectedPerson)
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upsz some error occured please try again later!" })
  }
})

app.post("/api/registration", (req,res) => {
  try {
    fs.readFile("./data/people.json", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Upsz some error occured please try again later!" })
      }

      const parsedData = JSON.parse(data)
      let newPerson = {
        id: parsedData.length + 1,
        name: req.body.name,
        profession: req.body.profession
      }

      parsedData.push(newPerson)

      fs.writeFile("./data/people.json", JSON.stringify(parsedData), "utf-8", (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(500).json({ message: "Upsz some error occured please try again later!" })
        }

        res.status(201).json({message: "Registration Successful!"})
      })

    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upsz some error occured please try again later!" })
  }
})

app.patch("/api/editProfile/:id", (req,res) => {
  try {
    fs.readFile("./data/people.json", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Upsz some error occured please try again later!" })
      }

      const parsedData = JSON.parse(data)
      let selectedPerson = parsedData.find((element) => {
        return element.id == req.params.id
      })

      if (!selectedPerson) {
        return res.status(500).json({ message: "Upsz some error occured please try again later!" })
      }

      selectedPerson.name = req.body.name
      selectedPerson.profession = req.body.profession

      fs.writeFile("./data/people.json", JSON.stringify(parsedData), "utf-8", (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(500).json({ message: "Upsz some error occured please try again later!" })
        }

        res.status(200).json({message: "Your profile have been edited successfully!"})
      })

    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upsz some error occured please try again later!" })
  }
})







//The last line is always the app.listen where we stpecify the port we want our server to run on
app.listen(3000, () => {
  console.log("App is listening on port: 3000");
});
