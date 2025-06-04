const express = require("express");
const multer = require("multer");
const path = require("path");
const KYC = require("../mudole/kyc");
const router = express.Router();

// Simple multer config for local storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/form", ensureAuth, (req, res) => {
  res.render("kyc", { user: req.user });
});

router.post("/submit-kyc", ensureAuth, async (req, res) => {
  const kyc = new KYC({
    user: req.user._id,
    fullName: req.body.fullName,
    idType: req.body.idType,
  });
  await kyc.save();
  res.render("userdash", { kyc });
});

module.exports = router;
