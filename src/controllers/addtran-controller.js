const prisma = require("../models");
const tryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");

module.exports.getCat = tryCatch(async (req, res, next) => {
  const { id: userId } = req.user;
  // Validate user
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return createError(400, "User not found!");
  }
  const cat = await prisma.cat.findMany({
    where: {
      userId,
      isActive: true,
    },
  });
  // Validate have cat
  if (!cat) {
    return createError(400, "Category not found!");
  }
  res.json({ msg: "Get cat successful...", cat });
});

module.exports.getAcct = tryCatch(async (req, res, next) => {
  const { id: userId } = req.user;
  // Validate user
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return createError(400, "User not found!");
  }
  const acct = await prisma.acct.findMany({
    where: {
      userId,
      isActive: true,
    },
  });
  // Validate have acct
  if (!acct) {
    return createError(400, "Account not found!");
  }
  res.json({ msg: "Get acct successful...", acct });
});

module.exports.getTrip = tryCatch(async (req, res, next) => {
  const { id: userId } = req.user;
  // Validate user
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return createError(400, "User not found!");
  }
  const trip = await prisma.trip.findMany({
    where: {
      userId,
      isActive: true,
    },
  });
  // Validate have trip
  if (!trip) {
    return createError(400, "Trip not found!");
  }
  res.json({ msg: "Get trip successful...", trip });
});
