const productModel = require("../../mongodb_database/productSchema");

const deleteProducts = async (req, res) => {
  const { productId } = req.body;

  try {
    await productModel.findByIdAndDelete(productId);
    res
      .status(200)
      .json({ success: true, msg: "successfully product deleted" });
  } catch (error) {
    res.status(422).json({ success: false, error: error.message });
  }
};

module.exports = deleteProducts;
