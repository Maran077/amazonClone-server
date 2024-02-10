const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User is required"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: [true, "Product is required"],
  },
  rating: {
    type: Number,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
    required: [true, "Rating is required"],
  },
  reviewTitle: {
    type: String,
    required: [true, "Review title is required"],
    minlength: [5, "Review must be at least 5 characters long"],
    maxlength: [100, "Review cannot exceed 100 characters"],
  },
  reviewText: {
    type: String,
    required: [true, "Review text is required"],
    minlength: [10, "Review must be at least 10 characters long"],
    maxlength: [5000, "Review cannot exceed 5000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reviewModel = mongoose.model("Reviews", reviewSchema);

module.exports = reviewModel;
