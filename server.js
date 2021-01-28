var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

const noteArray = [{"title":"Test Title","text":"Test text"}];

// Sets up the Express app to handle data parsing
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    noteArray.push(newNote);

    console.log(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(noteArray), function(err){
        if (err) throw err;
    });
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
}); 