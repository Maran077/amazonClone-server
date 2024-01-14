const productModel = require("../mongodb_database/productSchema");
const userModel = require("../mongodb_database/userSchema");

const getProductDetail = async (productId) => {
  try {
    const product = await productModel.findById(productId);
    if (!product)
      return { successInProduct: false, errorInProduct: "Product is not find" };

    const seller = await userModel.findById(product.seller, "-_id -password");
    if (!seller)
      return { successInProduct: false, errorInProduct: "Seller is not find" };

    const productData = {
      ...product._doc,
      seller: seller.userName,
    };
    return {
      successInProduct: true,
      productData,
    };
  } catch (e) {
    return {
      successInProduct: false,
      errorInProduct: `Resource is not ${e?.path}`,
    };
  }
};

module.exports = getProductDetail;
