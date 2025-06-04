const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
require("./config/passport")(passport);
app = express();
// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

//importing router
app.use(require("./Router/routr"));
app.use(require("./Router/kycroute"));
// Routes

// Start
app.listen(process.env.PORT, () =>
  console.log(`Server running on port: ${process.env.PORT} `)
);
