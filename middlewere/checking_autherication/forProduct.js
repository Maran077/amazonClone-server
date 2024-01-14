const productModel = require("../../mongodb_database/productSchema");
const { ObjectId } = require("bson");

const checking_autherication_for_products = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "product Not find It" });

    //convert new ObjectId('id') ==> id
    const product_seller_id = new ObjectId(product.seller).toString();

    if (product_seller_id !== userId)
      return res
        .status(401)
        .json({ success: false, error: "You can't access this resource." });
    next();
  } catch (error) {
    res.status(422).json({ success: false, error: error.message });
  }
};

module.exports = checking_autherication_for_products;
