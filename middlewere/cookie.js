const jwt = require("jsonwebtoken");
const userModel = require("../mongodb_database/userSchema");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../error/errorHandler");

const cookieVerify = catchAsyncError(async (req, res, next) => {
  // i use query because render.com doesn't support cookie
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findById(decoded.id);
  if (!user) return new ErrorHandler("please login first", 404);
  req.user = user;
  next();
});

module.exports = { cookieVerify };
