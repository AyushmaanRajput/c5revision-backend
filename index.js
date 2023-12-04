const express = require("express");
const connection = require("./connection");
const app = express();
const cors = require("cors");
const contanctRouter = require("./routes/contact.routes");
const appointmentRouter = require("./routes/appointment.routes");

require("dotenv").config();

app.use(cors());
app.use(express.json());
// app.get("/", (req, res, next) => {
//   res.send("Welcome To C5 Revision Backend");
// });

app.use("/contacts", contanctRouter);
app.use("/appointment", appointmentRouter);

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
