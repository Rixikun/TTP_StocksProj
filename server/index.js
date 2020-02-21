const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// const db = require('./db')
// const passport = require("passport");
// const session = require("express-session");
// const sessionStore = new SequelizeStore({ db });

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log(`nodemon listening to port ${process.env.PORT} or 8080`);
app.listen(process.env.PORT || 8080);
