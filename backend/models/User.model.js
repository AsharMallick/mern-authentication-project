const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

schema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

schema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

exports.User = mongoose.model("User", schema);
