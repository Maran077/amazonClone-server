const reviewModel = require("../mongodb_database/reviewSchema");
const userModel = require("../mongodb_database/userSchema");

const getProductReview = async (productId) => {
  const reviewAndReviewerData = [];
  const successMsg = {
    successInReview: true,
    reviewAndReviewerData,
  };
  try {
    const reviews = await reviewModel.find({ product: productId });
    for (const review of reviews) {
      const id = review.reviewer;
      const reviewer = await userModel.findOne({ _id: id }, "-_id -password");

      if (reviewer) {
        const reviewAndReviewer = {
          ...review._doc,
          reviewer: reviewer.userName,
          reviewerProfilePic: reviewer.userProfilePic,
        };

        reviewAndReviewerData.push(reviewAndReviewer);
      }
    }

    return successMsg;
  } catch (error) {
    return {
      successInReview: false,
      errorInReview: error.message,
    };
  }
};

module.exports = getProductReview;
