const express = require("express");
const mongoose = require("mongoose");
const errorMiddleware = require("./error/errorMiddleware");

const app = express();
if (process.env.ENV === "Test") {
  console.log("working on name TestingDB database.");
  const db = mongoose.connect("mongodb://localhost/bookAPI_TestingDB");
} else {
  console.log("working on name bookAPI database.");
  const db = mongoose.connect("mongodb://localhost/bookAPI");
}
const Book = require("./models/bookModels");
const bookRouter = require("./routes/bookRoutes")(Book);

const port = process.env.PORT || 3000;
app.use(errorMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", bookRouter);
app.get("/", (req, res) => {
  res.send("Welcome to home route.");
});

app.server = app.listen(port, () => {
  console.log("server is running on port: ", port);
});
app.all("*", (req, res, next) => {
  /*
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
  */
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail   cfvbgfhf";
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});

module.exports = app;
