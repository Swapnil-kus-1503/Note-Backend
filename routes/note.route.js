const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/noteModel");
const { authentication } = require("../middlewares/authentication");
const noteRouter = express.Router();
noteRouter.use(authentication);

noteRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, "swapnil", async (err, decode) => {
    try {
      let data = await NoteModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "Successful",
        status: 200,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 402,
      });
    }
  });
});

// create

noteRouter.post("/create", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.send({ message: "Note Created", status: 200 });
  } catch (error) {
    res.send({
      message: error.message,
      status: 402,
    });
  }
});

// update

noteRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note updated",
      status: 200,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 402,
    });
  }
});

// delete

noteRouter.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Note deleted",
      status: 200,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 402,
    });
  }
});

module.exports = { noteRouter };
