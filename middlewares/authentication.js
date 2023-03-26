const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, "swapnil", (err, decode) => {
    if (err) {
      res.send({ message: "Token is not valid please login", status: 402 });
    }

    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({ message: "Token is not valid please login", status: 402 });
    }
  });
}

module.exports = { authentication };
