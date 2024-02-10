const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../mongodb_database/userSchema");
const ErrorHandler = require("../error/errorHandler");
const catchAsyncError = require("../middlewere/catchAsyncError");

const login = catchAsyncError(async (req, res, next) => {
  const { userName, password } = req.body;

  const user = await userModel.findOne({ userName: userName });
  if (!user) return next(new ErrorHandler("User or Password is invalid", 404));

  const passwordVerify = await bcrypt.compare(password, user.password);
  if (!passwordVerify)
    return next(new ErrorHandler("User or Password is invalid", 404));

  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPRIRE,
  });

  res.status(200).json({ success: true, msg: "successfully login", token });
});

module.exports = login;
