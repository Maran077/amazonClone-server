const reviewModel = require("../../mongodb_database/reviewSchema");
const { ObjectId } = require("bson");

const checking_autherication_for_reviews = async (req, res, next) => {
  const { reviewId } = req.body;
  const userId = req.user.id;

  try {
    const review = await reviewModel.findById(reviewId);
    if (!review)
      return res
        .status(404)
        .json({ success: false, error: "review Not find It" });

    //convert new ObjectId('number') ==> number
    const reviewer_id = new ObjectId(review.reviewer).toString();

    if (reviewer_id !== userId)
      return res
        .status(401)
        .json({ success: false, error: "You can't access this resource." });
    next();
  } catch (error) {
    res.status(422).json({ success: false, error: error.message });
  }
};

module.exports = checking_autherication_for_reviews;
