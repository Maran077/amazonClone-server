const productModel = require("../../mongodb_database/productSchema");
const setProductDetail = require("../setProductDetail");

const catchAsyncError = require("../../middlewere/catchAsyncError");

const addProducts = catchAsyncError(async (req, res) => {
  const {
    productImages,
    productName,
    description,
    price,
    stocks,
    category,
    seller,
  } = await setProductDetail(req);

  await productModel.create({
    productImages,
    productName,
    description,
    price,
    stocks,
    category,
    seller,
  });
  res.status(200).json({ success: true, msg: "successfully product created" });
});

module.exports = addProducts;
