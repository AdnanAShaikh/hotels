const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("./auth");

const PORT = process.env.PORT || 3000;

const app = express();

//Middle Wares

//this middleware used to parses any type of data into json
//then stores the incoming data into req.body
app.use(bodyParser.json());

// logs
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.method}`
  );
  next();
};

app.use(logRequest);

// from auth.js
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

//server
app.get("/", localAuthMiddleware, (req, res) => {
  res.send("<h1>Welcome</h1>");
});

// person router

const personRoutes = require("./routes/personRoutes");
app.use("/person", localAuthMiddleware, personRoutes);

//menu router

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("server started at 3000");
});
