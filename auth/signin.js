const fs = require("fs");
const jwt = require("jsonwebtoken");
const userModel = require("../mongodb_database/userSchema");
const catchAsyncError = require("../middlewere/catchAsyncError");
const ErrorHandler = require("../error/errorHandler");

const signin = catchAsyncError(async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log("hi");
  const userProfilePic = {
    data: fs.readFileSync("./asset/default_profile_pic.jpg"),
    contentType: "image/jpg",
  };
  if (!userName || !email || !password)
    return next(new ErrorHandler("please fill all required field", 404));

  const user = await userModel.create({
    userName,
    email,
    password,
    userProfilePic,
  });

  const token = jwt.sign({ id: user?._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPRIRE,
  });

  if (!token || !user)
    return next(
      new ErrorHandler("something wrong please resend data again", 500)
    );

  res
    .status(200)
    .cookie("token", token, {
      maxAge: process.env.COOKIE_EXPRIRE * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    })
    .json({ success: true, msg: "successfully signin" });
});

module.exports = signin;
