const ErrorHandler = require("../../error/errorHandler");
const catchAsyncError = require("../../middlewere/catchAsyncError");
const userModel = require("../../mongodb_database/userSchema");
const getCardProduct = require("../../profile/getCardProducts");

const updateCard = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.body;
  console.log(productId);
  if (!productId)
    return next(new ErrorHandler("please give product detail", 404));

  const user = await userModel.findById(_id);
  if (!user) return next(new ErrorHandler("User is not find", 404));

  const isProductInArray = user.cartProducts.includes(productId);
  let updatedUser;
  let msg;
  if (isProductInArray) {
    updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { $pull: { cartProducts: productId } },
      { new: true }
    );
    msg = "successfully product remove to cart";
  } else {
    updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { $addToSet: { cartProducts: productId } },
      { new: true }
    );
    msg = "successfully product add to cart";
  }
  const { success, error, products } = await getCardProduct(
    updatedUser.cartProducts
  );
  if (!success) return next(new ErrorHandler(error, 404));
  return res.status(201).json({ success: true, msg, cartProducts: products });
});
module.exports = updateCard;
