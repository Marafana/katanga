const express = require("express");
const passport = require("passport");
const User = require("../mudole/user");
const router = express.Router();

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.redirect("/auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/auth/login"));
});

module.exports = router;
