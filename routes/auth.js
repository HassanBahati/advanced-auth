const express = require("express");
const router = express.Router();

const {
  resetpassword,
  register,
  login,
  forgotpassword,
  test,
} = require("../controllers/auth");

router.route("/test").get(test);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;
