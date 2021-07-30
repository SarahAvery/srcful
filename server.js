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
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { generateHelpers } = require("./routes/api/utils/queryHelpers.js");
const db = new Pool(dbParams);
db.on("connect", () => console.log("connnected to database 🥳"));
db.connect();

const queryHelpers = generateHelpers(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(
  cookieSession({
    name: "session",
    keys: ["encryptdemcookies"],
  })
);

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

// api routes
app.use("/api/users", require("./routes/api/users")(db, queryHelpers));
app.use("/api/resources", require("./routes/api/resources")(db, queryHelpers));
app.use("/api/resource", require("./routes/api/resource")(db, queryHelpers));
app.use(
  "/api/categories",
  require("./routes/api/categories")(db, queryHelpers)
);
app.use("/api/user", require("./routes/api/user")(db, queryHelpers));
app.use("/api/like", require("./routes/api/like")(db, queryHelpers));
app.use("/api/login", require("./routes/api/login")(db, queryHelpers));
app.use(
  "/api/resource_ratings",
  require("./routes/api/resource_ratings")(db, queryHelpers)
);
app.use(
  "/api/resource_comments",
  require("./routes/api/resource_comments")(db, queryHelpers)
);

// html routes
app.use("/", require("./routes/index")(db, queryHelpers));
app.use("/login", require("./routes/login")(db, queryHelpers));
app.use("/signup", require("./routes/signup")(db, queryHelpers));

// authentication middleware (must go here, ie after the 3 routes above)
app.use("/", (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/");
});

app.use("/profile", require("./routes/profile")(db, queryHelpers));
app.use("/logout", require("./routes/logout")());
app.use("/resources", require("./routes/resources")(db, queryHelpers));
app.use("/resource", require("./routes/resource")(db, queryHelpers));
app.use("/search", require("./routes/search")(db, queryHelpers));

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
