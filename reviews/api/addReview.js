const catchAsyncError = require("../../middlewere/catchAsyncError");
const productModel = require("../../mongodb_database/productSchema");
const reviewModel = require("../../mongodb_database/reviewSchema");
const userModel = require("../../mongodb_database/userSchema");

const addReview = catchAsyncError(async (req, res) => {
  const { product, rating, reviewText, reviewTitle } = req.body;
  const reviewer = req.user._id;
  const product_ = await productModel.findById(product);

  if (product_) {
    let { star, numberOfReview } = product_;
    let divided = numberOfReview == 0 ? 1 : 2;
    numberOfReview += 1;
    star += parseInt(rating);
    star = Math.round(star / divided);
    star = star > 5 ? 5 : star;
    await productModel.findByIdAndUpdate(product, {
      star,
      numberOfReview,
    });
  }

  const { seller } = product_;
  const user_ = await userModel.findById(seller);
  if (user_) {
    let { star, numberOfReview } = user_;
    let divided = numberOfReview == 0 ? 1 : 2;
    numberOfReview += 1;
    star += parseInt(rating);
    star = Math.round(star / divided);
    star = star > 5 ? 5 : star;
    await userModel.findByIdAndUpdate(seller, {
      star,
      numberOfReview,
    });
  }

  await reviewModel.create({
    reviewer,
    product,
    rating,
    reviewText,
    reviewTitle,
  });
  res.status(200).json({ success: true, msg: "successfully review created" });
});

module.exports = addReview;
