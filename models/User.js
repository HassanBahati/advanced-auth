const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minlength: 6,
    select: false, //whenever a user is queried dont return password
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//middleware run before saving data
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // hash pawords
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// custom method to match passwords
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// cunstom method
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// generate hashed token for resetpassword
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // use generated string by crypto and set it as resetPasswordToken in model
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    //10 minutes 
  this.resetPasswordExpire = Date.now() + 10* (60*1000)
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
