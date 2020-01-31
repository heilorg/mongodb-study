const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Book = require("./models/book");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // 객체 안 객체 허용
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = require("./routes")(app, Book);

const server = app.listen(port, () => {
    console.log("Express server has started on port " + port);
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("Connected to mongod server");
});

mongoose.connect("mongodb://localhost/mongodb_tutorial");
// mongoose.connect('mongodb://username:password@host:port/database?options...');
