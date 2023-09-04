// const express = require("express")
// const router = express.Router()
// const fs = require("fs");
// const path = require("path");

import express from "express"
const router = express.Router()
import fs from "fs"
import path from "path"


router.get("/getPeopleData", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: "Upss, something went wrong, please try again later!" });
        const items = JSON.parse(data)
        res.json(items)
    })
})

router.post("/addNewPerson", (req, res) => {
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

router.put("/replacePerson/:name", (req, res) => {
    fs.readFile('./data/people.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
        }

        const allData = JSON.parse(data)
        const selectedPerson = allData.find(nextData => nextData.name === req.params.name)
        const newAge = parseInt(req.body.age)
        if (newAge === NaN) {
            return res.status(422).json({ message: "Wrong data provided!" })
        }
        selectedPerson.name = req.body.name
        selectedPerson.age = newAge

        fs.writeFile('./data/people.json', JSON.stringify(allData), (err) => {
            if (err) {
                return res.status(500).json({ message: "Upss, something went wrong, please try again later!" }) 
            }

            return res.json({ message: "Hurray the data have been updated!" })
        })
    })
})

router.patch("/changeName/:name", (req, res) => {
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

router.delete("/deletePerson/:name", (req, res) => {
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



// module.exports = router
export default router