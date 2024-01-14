const ErrorHandler = require("../../error/errorHandler");
const catchAsyncError = require("../../middlewere/catchAsyncError");
const productModel = require("../../mongodb_database/productSchema");
const userModel = require("../../mongodb_database/userSchema");

const sellerProfile = catchAsyncError(async (req, res, next) => {
  const { sellerName } = req.params;

  const seller = await userModel.findOne(
    { userName: sellerName },
    "-_id -password -email"
  );
  const seller_id = await userModel.findOne(
    { userName: sellerName },
    "-password -email"
  );

  if (!seller) return next(new ErrorHandler("Seller is not find", 404));
  if (seller.role !== "seller")
    return next(new ErrorHandler("User is not seller", 401));

  const products =
    (await productModel.find({ seller: seller_id._id }, "-seller")) || [];
  const sellerAndProduct = {
    seller,
    products,
  };

  res.status(200).json({ success: true, seller: sellerAndProduct });
});

module.exports = sellerProfile;
