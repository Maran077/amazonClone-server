const ErrorHandler = require("../../error/errorHandler");
const catchAsyncError = require("../../middlewere/catchAsyncError");
const getProductDetail = require("../getProductDetail");
const getProductReview = require("../getProductReview");

const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params;

  const { successInProduct, productData, errorInProduct } =
    await getProductDetail(productId);
  if (!successInProduct) return next(new ErrorHandler(errorInProduct, 400));

  const { successInReview, reviewAndReviewerData, errorInReview } =
    await getProductReview(productId);
  if (!successInReview) return next(new ErrorHandler(errorInReview, 400));

  const productAndReviewData = {
    productData,
    reviewAndReviewerData,
  };

  res.status(200).json({ success: true, productAndReviewData });
});

module.exports = getSingleProduct;
