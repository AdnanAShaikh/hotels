const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.DB_LOCAL_URL;
// const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("COnnection error: ", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
