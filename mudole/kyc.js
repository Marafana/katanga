const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  idType: String,
  idNumber: String,

  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("KYC", kycSchema);
