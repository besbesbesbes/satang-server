const prisma = require("../models");
const tryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");

module.exports.getTrans = tryCatch(async (req, res, next) => {
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

  // Get transactions
  const trans = await prisma.trans.findMany({
    where: {
      userId,
    },
    include: {
      TransSub: {
        include: {
          acct: true,
          cat: true,
          trip: true,
        },
      },
    },
    orderBy: {
      time: "desc",
    },
  });

  // Process each transaction to calculate sums
  const transWithSums = trans.map((tran) => {
    const transSubIsInTrue = tran.TransSub.filter((sub) => sub.isIn).reduce(
      (sum, sub) => sum + Number(sub.amt || 0),
      0
    );

    const transSubIsInFalse = tran.TransSub.filter((sub) => !sub.isIn).reduce(
      (sum, sub) => sum + Number(sub.amt || 0),
      0
    );

    return {
      ...tran,
      transSubIsInTrue, // Sum of `amt` where `is_in` is true
      transSubIsInFalse, // Sum of `amt` where `is_in` is false
    };
  });

  res.json({ msg: "Get trans successful...", trans: transWithSums });
});
