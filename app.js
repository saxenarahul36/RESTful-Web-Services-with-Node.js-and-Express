var express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// const db = mongoose.connect("mongodb://localhost/bookAPI");
var app = express();
if (process.env.ENV === "Test") {
  console.log("working on name TestingDB database.");
  const db = mongoose.connect("mongodb://localhost/bookAPI_TestingDB");
} else {
  console.log("working on name bookAPI database.");
  const db = mongoose.connect("mongodb://localhost/bookAPI");
}
const Book = require("./models/bookModels");
const bookRouter = require("./routes/bookRoutes")(Book);

var port = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api", bookRouter);
app.get("/", (req, res) => {
  res.send("Welcome to home route.");
});

app.server = app.listen(port, () => {
  console.log("server is running on port: ", port);
});

module.exports = app;
