const catchAsyncError = require("../../middlewere/catchAsyncError");
const userModel = require("../../mongodb_database/userSchema");
const fs = require("fs");

const editUser = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  const { userName, role, description } = req.body;
  const { file } = req;
  const updateValue = {};
  updateValue.userName = userName;

  if (file) {
    const buffer = file.buffer;
    updateValue.userProfilePic = {
      data: buffer,
      contentType: "image/jpg",
    };
  }

  if (role === "seller") {
    updateValue.role = role;
    updateValue.description = description;
  }

  const user = await userModel.findOneAndUpdate({ _id }, updateValue, {
    new: true,
    runValidators: true,
  });
  res
    .status(200)
    .json({ success: true, msg: "successfully profile updated", user });
});

module.exports = editUser;
