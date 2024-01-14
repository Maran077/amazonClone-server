const ErrorHandler = require("../../error/errorHandler");
const catchAsyncError = require("../../middlewere/catchAsyncError");
const productModel = require("../../mongodb_database/productSchema");
const getFilterParameter = require("../getFilterParameter");

const filterProducts = catchAsyncError(async (req, res, next) => {
  const query = await getFilterParameter(req);

  const page = req.query.page || 1;
  const limit = 4;
  const skip = limit * (page - 1);

  const products = await productModel
    .find(query, "-seller")
    .skip(skip)
    .limit(limit);
  if (!products) return next(new ErrorHandler("There is no product", 404));

  const totalCount = await productModel.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({ success: true, products, totalPages });
});

module.exports = filterProducts;
