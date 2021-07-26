// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.on("connect", () => console.log("connnected to database 🥳"));
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(cookieSession({
  name: 'session',
  keys: ['encryptdemcookies']
}));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// WE ONLY CARE ABOUT STUFF BELOW

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/api/users");
const indexRoutes = require("./routes/api/resources");

const profileRoutes = require("./routes/profile");
const loginRoutes = require("./routes/login");
const signup = require("./routes/signup");
const myResources = require("./routes/my-resources");
const index = require("./routes/index");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// api routes
app.use("/api/users", usersRoutes(db));
app.use("/api/resources", indexRoutes(db));

// html routes
app.use("/profile", profileRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/signup", signup(db));
app.use("/my-resources", myResources(db));
app.use("/", index(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index", res);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
