const express = require("express");
const profileRouter = express.Router();

const { cookieVerify } = require("../middlewere/cookie");

const sellerProfile = require("./api/sellerProfile");
const userProfile = require("./api/userProfile");

profileRouter.get("/seller/:sellerName", sellerProfile);
profileRouter.get("/user", cookieVerify, userProfile);

module.exports = profileRouter;
