const prisma = require("../models");
const tryCatch = require("../utils/tryCatch");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//RegExp
function checkUserOrEmail(username) {
  let idKey = "username";
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)) {
    idKey = "email";
  }
  if (!idKey) {
    createError(400, "Only username or email!");
  }
  return idKey;
}

module.exports.login = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  // validate
  if (!(username.trim() && password.trim())) {
    createError(400, "Please fill all data!");
  }
  // check email or phone
  const idKey = checkUserOrEmail(username);
  // find user
  const foundUser = await prisma.user.findUnique({
    where: {
      [idKey]: username,
    },
  });
  if (!foundUser) {
    createError(401, "Invalid login!");
  }
  // compare password
  const pwOk = await bcrypt.compare(password, foundUser.password);
  if (!pwOk) {
    createError(401, "Invalid login!");
  }
  // payload
  const payload = {
    id: foundUser.id,
  };
  // create token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // return user
  console.log(foundUser);
  const { password: pw, createdAt, updatedAt, ...userData } = foundUser;
  res.json({ msg: "Login successful...", token, userData });
});
