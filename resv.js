// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3070;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var data = {

    reservations: [],
    waitlist: [],
 
};

// var visitorCount = 0;
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
//   vistorCount++;
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });
// get reservation data with api

app.get("/api/tables", function(req, res) {
  res.json(data.reservations);

});
// for waitlist
app.get("/api/waitlist", function(req, res) {
    res.json(data.waitlist);
  
  });


// return tables and waitlist arrays
app.get("/api/", function(req, res) {
    res.json(data);
});

app.get("/api/vistors", function(req, res) {
    res.json(vistorCount);
});

// getting table data from post


// Starts the server to begin listening
// =============================================================

app.post("/api/new", function(req, res) {
    var tableData = req.body;
    console.log(tableData);
    if (tableData && tableData.name) {
        tableData.routeName = tableData.name.replace(/\s+/g, "").toLowerCase();
    }
    console.log(tableData);
   
    if (data.reservations.length < 5) {
        data.reservations.push(tableData);
    } else {
        data.waitlist.push(tableData);
    }
   
   
    res.json(tableData);
   });
   
   app.get("/api/remove/:id?", function(req, res) {
    var tableId = req.params.id;
   
    if (tableId) {
      console.log(tableId);
       for (var i = 0; i < data.reservations.length; i++) {
         if (tableId === data.reservations[i].id) {
             data.reservations.splice(i, 1);
             if (data.waitlist.length > 0) {
                 var tempTable = data.waitlist.splice(0, 1)[0];
                 data.reservations.push(tempTable);
             }
   
           return res.json(true);
         }
       }
       for (var i = 0; i < data.waitlist.length; i++) {
         if (tableId === data.waitlist[i].id) {
             data.waitlist.splice(i, 1);
   
           return res.json(true);
         }
       }
       return res.json(false);
    }
    return res.json(false);
   });
   
   // Start the Server
   app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
   });