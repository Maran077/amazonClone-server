const express = require("express");
const app = express();
const authRouter = express.Router();

const signin = require("./signin");
const login = require("./login");

authRouter.post("/signin", signin);
authRouter.post("/login", login);

module.exports = authRouter;
