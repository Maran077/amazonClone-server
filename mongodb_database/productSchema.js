const mongoose = require("mongoose");

const allowedCategories = [
  "Electronics",
  "Fashion and Apparel",
  "Home and Furniture",
  "Toys and Games",
  "Sports",
];

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    minlength: [10, "Productname must be at least 10 characters long"],
    maxlength: [50, "Productname cannot exceed 50 characters."],
    required: [true, "Name is required"],
  },
  productImages: {
    type: [
      {
        contentType: String,
        data: Buffer,
      },
    ],
    validate: {
      validator: function (array) {
        return array.length > 0 && array.length <= 6;
      },
      message: "Images should containa at least one and at most six Images",
    },
    required: [true, "Images are required"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Seller is required"],
  },
  description: {
    type: String,
    minlength: [50, "Description must be at least 50 characters long"],
    maxlength: [1000, "Description cannot exceed 500 characters."],
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    enum: {
      values: allowedCategories,
      message: "Category must be one of: " + allowedCategories.join(", "),
    },
    required: [true, "Category is required"],
  },
  stocks: {
    type: Number,
    required: [true, "Stock is required"],
  },
  star: {
    type: Number,
    min: [0, "give star atleast zero"],
    max: [5, "give star below or equal to 5"],
    default: 0,
  },
  numberOfReview: {
    type: Number,
    default: 0,
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
