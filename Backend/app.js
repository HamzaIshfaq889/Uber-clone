const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("The Uber API!");
});

app.use("/api/v1", routes);

module.exports = app;
