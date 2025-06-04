const express = require("express");
const passport = require("passport");
const User = require("../mudole/user");
const router = express.Router();
// ensure
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/", (req, res) => res.render("register"));
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login", { users: User }));
router.get("/index", (req, res) => res.render("index", { User }));

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.redirect("/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/login"));
});

module.exports = router;
