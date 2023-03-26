const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("You're the certified User");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) return res.send({ message: "somthing went wrong", status: 401 });
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({
        message: "User created",
        status: 200,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 401,
      });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn: "720min",
  };

  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "swapnil", option);
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({
            message: "Somthing went wrong:" + err,
            status: 401,
          });
        if (result) {
          res.send({
            message: "User logIn successfully",
            token: token,
            status: 200,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 401,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 500,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 401,
    });
  }
});

module.exports = { userRouter };
