const express = require("express");
const productRouter = express.Router();

const upload = require("../middlewere/multer");
const { cookieVerify } = require("../middlewere/cookie");
const checking_autherication_for_products = require("../middlewere/checking_autherication/forProduct");

const filterProducts = require("./api/filterProduct");
const getSingleProduct = require("./api/getSingleProduct");
const addProducts = require("./api/addProucts");
const deleteProducts = require("./api/deleteProduct");
const updateProducts = require("./api/updateProduct");

productRouter.get("/product", filterProducts);
productRouter.get("/product/:productId", getSingleProduct);
productRouter.post(
  "/product",
  cookieVerify,
  upload.array("productImages", 6),
  addProducts
);
productRouter.delete(
  "/product",
  cookieVerify,
  checking_autherication_for_products,
  deleteProducts
);
productRouter.put(
  "/product",
  cookieVerify,
  upload.array("productImages", 6),
  checking_autherication_for_products,
  updateProducts
);

module.exports = productRouter;
