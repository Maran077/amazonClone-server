const productModel = require("../mongodb_database/productSchema");

const getCardProduct = async (cartProductIds) => {
  try {
    const products = [];
    for (const productId of cartProductIds) {
      const product = await productModel.findById(productId, "-seller");
      if (product) products.push(product);
    }
    return {
      success: true,
      products,
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
};

module.exports = getCardProduct;
