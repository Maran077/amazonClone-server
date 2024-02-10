const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const roles = ["customer", "seller", "admin"];
const User = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required."],
    minlength: [4, "Username must be at least 4 characters long."],
    maxlength: [50, "Username cannot exceed 50 characters."],
    unique: [true, "Username already exit."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exit."],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [20, "Password cannot exceed 20 characters."],
    match: [
      /^(?=.*\d)(?=.*[a-zA-Z]).*/,
      "Password does not meet complexity requirements",
    ],
  },
  userProfilePic: {
    contentType: String,
    data: Buffer,
  },
  role: {
    type: String,
    enum: {
      values: roles,
      message: "This role not allowed",
    },
    default: "customer",
  },

  description: {
    type: String,
    minlength: [20, "Description must be at least 20 characters long"],
    maxlength: [1000, "Description cannot exceed 1000 characters."],
    validate: {
      validator: function () {
        const newRole = this._update?.$set.role;
        return newRole === "seller" || this.role === "seller";
      },
      message: "Description applies only to sellers",
    },
  },
  cartProducts: [mongoose.Schema.Types.ObjectId],
  star: {
    type: Number,
    min: [0, "give star atleast zero"],
    max: [5, "give star below or equal to 5"],
    validate: {
      validator: function () {
        const newRole = this._update?.$set.role;
        return newRole === "seller" || this.role === "seller";
      },
      message: "star applies only to sellers",
    },
  },
  numberOfReview: {
    type: Number,
    validate: {
      validator: function () {
        const newRole = this._update?.$set.role;
        return newRole === "seller" || this.role === "seller";
      },
      message: "numberOfReview applies only to sellers",
    },
  },
});

User.pre("save", async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  if (this.role === "seller" && this.isNew) {
    this.star = 0;
    this.numberOfReview = 0;
  }
  next();
});

const userModel = mongoose.model("Users", User);

module.exports = userModel;
