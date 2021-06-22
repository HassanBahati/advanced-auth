exports.register = (req, res, next) => {
  res.send("register route");
};

exports.login = (req, res, next) => {
  res.send("login route");
};

exports.forgotpassword = (req, res, next) => {
  res.send("forgot password route");
};

exports.resetpassword = (req, res, next) => {
  res.send("reset password route");
};

exports.test = (req, res, next) => {
  res.send("test route");
};
