const ErrorHandler = require("../../error/errorHandler");
const catchAsyncError = require("../../middlewere/catchAsyncError");
const productModel = require("../../mongodb_database/productSchema");
const userModel = require("../../mongodb_database/userSchema");
const getCardProduct = require("../getCardProducts");

const userProfile = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const user = await userModel.findById(_id, "-_id -password");
  if (!user)
    return next(
      new ErrorHandler("Your profile not found.please try again or login.", 404)
    );

  const { success, products, error } = await getCardProduct(user.cartProducts);
  if (!success) return next(new ErrorHandler(error, 404));
  const sellingProucts =
    (await productModel.find({ seller: _id }, "-seller")) || [];

  const userAndCartProduct = {
    user,
    cartProducts: products,
    sellingProucts,
  };
  res.status(200).json({ success: true, user: userAndCartProduct });
});

module.exports = userProfile;
