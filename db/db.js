const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");

class DB {
  read() {
    return readFile("db/db.json", "utf8");
  }
  write(note) {
    return writeFile("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let parseNotes = [];
      try {
        parseNotes = parseNotes.concat(JSON.parse(notes));
        console.log(parseNotes);
      } catch (err) {
        parseNotes = [];
      }
      return parseNotes;
    });
  }
  addNotes(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Notes cannot be blank. Please enter your text.");
    } else {
      const newNote = { title, text, id: uuidv4() };
      return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
  }
  deleteNote(id) {
    return this.getNotes()
      .then((parseNotes) => parseNotes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new DB();
