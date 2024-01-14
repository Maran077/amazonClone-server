const express = require("express");
const reviewRouter = express.Router();

const { cookieVerify } = require("../middlewere/cookie");
const checking_autherication_for_reviews = require("../middlewere/checking_autherication/forReview");

const addReview = require("./api/addReview");
const updateReview = require("./api/updateReview");
const deleteReview = require("./api/deleteReview");

reviewRouter.post("/review",cookieVerify,addReview)
reviewRouter.put("/review",cookieVerify,checking_autherication_for_reviews,updateReview)
reviewRouter.delete("/review",cookieVerify,checking_autherication_for_reviews,deleteReview)

module.exports = reviewRouter