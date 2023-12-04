const express = require("express");
const connection = require("./connection");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB ");
    console.log("Server started at port " + process.env.PORT);
  } catch (e) {
    console.log(e);
    console.log("Connection to DB failed");
  }
});
