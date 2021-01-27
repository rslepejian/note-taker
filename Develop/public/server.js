var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});


app.get("/api/restuarants/:table", function(req, res) {
    var chosen = req.params.table;
  
    console.log(chosen);
    for (var i = 0; i < infoArray.length; i++) {
      if (chosen == infoArray[i].routeName) {
        return res.json(infoArray[i]);
      }
    }
    return res.json(false);
  });

app.post("/api/info", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);
  
    infoArray.push(newTable);
  
    res.json(newTable);


  });


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});