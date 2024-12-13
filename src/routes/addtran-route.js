const express = require("express");
const addtranRoute = express.Router();
const addtranController = require("../controllers/addtran-controller");

addtranRoute.get("/cat", addtranController.getCat);
addtranRoute.get("/acct", addtranController.getAcct);
addtranRoute.get("/trip", addtranController.getTrip);

module.exports = addtranRoute;
