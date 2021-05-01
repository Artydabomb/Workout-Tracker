const express = require("express");
var router = express.Router();
const path = require("path");

//Code to render HTML pages

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

module.exports = router;