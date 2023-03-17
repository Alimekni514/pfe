const express = require("express");
const { verify } = require("../controllers/payment");
const { Add } = require("../controllers/payment");

const Router = express.Router();

Router.post("/payment", Add);
Router.post("/payment/:id", verify);

module.exports = Router;
