const express = require("express");
const transRoute = express.Router();
const transController = require("../controllers/trans-controller");

transRoute.post("/", transController.getTrans);

module.exports = transRoute;
