const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (decoded) {
        (req.body.userID = decoded.userID), (req.body.name = decoded.name);
        next();
      } else {
        res.send({ err: "please login " });
      }
    });
  } else {
    res.send({ msg: "please login" });
  }
};

module.exports = { auth };
