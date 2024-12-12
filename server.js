require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error");
const authenticate = require("./src/middlewares/authenticate");
const authRoute = require("./src/routes/auth-route");
const transRoute = require("./src/routes/trans-route");

//middleware
app.use(cors());
app.use(express.json());

//routing
app.use("/api/auth", authRoute);
app.use("/api/trans", authenticate, transRoute);
app.use(notFound);
app.use(errorMiddleware);

//start server
const port = process.env.PORT || 8011;
app.listen(port, () => console.log("Server on ", port));

//test
