const router = require("express").Router();
const DB = require("../db/db")

router.get("/api/notes", (req, res) => {
    DB.getNotes().then(response => {
        res.json(response)
    }).catch(err => {
        res.json(err)
    }) 
})


module.exports = router;