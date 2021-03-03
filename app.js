var express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const db = mongoose.connect("mongodb://localhost/bookAPI");
var app = express();

const Book = require("./models/bookModels");
const bookRouter = require("./routes/bookRoutes")(Book);

var port = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api", bookRouter);
app.get("/", (req, res) => {
  res.send("Welcome to home route.");
});

app.listen(port, () => {
  console.log("server is running on port: ", port);
});
