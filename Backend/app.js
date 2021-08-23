const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const authRoute = require("./route/auth-route");
const fileRoute = require("./route/fileroute");
const config = require("./config/config");

const app = express();
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    key: "userId",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use("/", authRoute);
app.use("/user", fileRoute);

module.exports = app;
