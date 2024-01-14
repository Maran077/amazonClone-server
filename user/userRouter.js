const express = require("express");
const userRouter = express.Router();

const { cookieVerify } = require("../middlewere/cookie");

const updateCard = require("./api/updateCardProduct");
const editUser = require("./api/userEdit");
const upload = require("../middlewere/multer");

userRouter.put("/cart", cookieVerify, updateCard);
userRouter.put(
  "/edit",
  cookieVerify,
  upload.single("userProfilePic"),
  editUser
);

module.exports = userRouter;
