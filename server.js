const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

//middleware used to parsesany type of data into json
//then stores the incoming data into req.body
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

// person router

const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

//menu router

const menuRoutes = require("./routes/menuRoutes");

app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("server started at 3000");
});
