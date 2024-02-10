const jwt = require("jsonwebtoken");
const userModel = require("../mongodb_database/userSchema");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../error/errorHandler");

const cookieVerify = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  console.log("k");
  const user = await userModel.findById(decoded.id);
  // console.log("k", user);
  if (!user) return new ErrorHandler("please login first", 404);
  req.user = user;
  next();
});

module.exports = { cookieVerify };
