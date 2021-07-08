const router = require("express").Router();
const DB = require("../db/db")

router.get("/api/notes", (req, res) => {
    DB.getNotes().then(response => {
        res.json(response)
    }).catch(err => {
        res.json(err)
    }) 
})

router.post("/api/notes", (req, res) => {
    DB.addNotes(req.body)
    .then((userNote) => res.json(userNote))
    .catch(err => {
        res.json(err)
    }) 
})

router.delete("/api/notes/:id", (req,res) => {
    DB.deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => {
        res.json(err)
    }) 
})


module.exports = router;