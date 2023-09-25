const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ name, email, gender, password: hash });
      await user.save();
      res.status(200).json({ msg: "New User Added Successful!!" });
    });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, name: user.name },
            process.env.secretKey,
            {
              expiresIn: "7d",
            }
          );
          const refToken = jwt.sign(
            { userID: user._id, name: user.name },
            process.env.secretKey,
            {
              expiresIn: "10d",
            }
          );
          res.status(200).json({
            msg: "New User Added Successful!!",
            token: token,
            refToken: refToken,
          });
        } else {
          res.status(401).json({ err: "Invalid Credentials" });
        }
      });
    } else {
      res.status(200).json({ err: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = { userRouter };
