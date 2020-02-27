var express = require("express");
var path = require("path");
var fs = require("fs");
let dbPath = path.join(__dirname, "db.json");
let notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

var app = express();
var PORT = 8080;


let notesData = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/notes', function (req, res) {
  return res.sendFile(path.join(__dirname, "notes.html")
  )
});
app.get('*', function (req, res) {
  return res.sendFile(path.join(__dirname, "index.html"))
});
app.get('/api/notes', function (req, res) {
  return res.json(notes);
});
app.post('/api/notes', function (req, res) {
  let newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);
  fs.writeFileSync(dbPath, JSON.stringify(notes));
  res.json(newNote);
});
app.delete('/api/notes/:id', function (req, res) {
  let deletionId = req.params.id;
  notes = notes.filter(note => note.id !== deletionId);
  fs.writeFileSync(dbPath, JSON.stringify(notes));
  res.json(notes);

});


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});