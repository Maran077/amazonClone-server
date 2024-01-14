const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const cookie = require("cookie-parser");
const database_connection = require("./mongodb_database/mongodb_connect");

const authRouter = require("./auth/authRouter");
const productRouter = require("./product/productRouter");
const reviewRouter = require("./reviews/reviewRouter");
const profileRouter = require("./profile/profileRouter");
const userRouter = require("./user/userRouter");

const errorMiddlewere = require("./middlewere/error");

PORT = process.env.PORT || 3000;

dotenv.config();
database_connection();

app.use(cors({ origin: process.env.CLIENT_DOMAIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/profile", profileRouter);
app.use("/user", userRouter);

app.use(errorMiddlewere);

app.listen(PORT, () => {
  console.log("online now");
});
