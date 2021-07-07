const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile) 

class DB {
    read() {
        return readFile("db/db.json", "utf8")
    }
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(rawNotes => {
            let parseNotes = [];
            try {
                parseNotes = parseNotes.concat(JSON.parse(rawNotes))
                console.log(parseNotes)
            } catch (err) {
                parseNotes = [];
            }
            return parseNotes;
        })
    }
    addNotes(note) {
        const newNote = {
            title: note.title,
            text: note.text,
            id: 1
        }
        return this.getNotes().then(oldNotes => {
            oldNotes.push(newNote)
        })
    }
    // deleteNote(id) {
    //     return 
    // }
}

module.exports = new DB()