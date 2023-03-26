const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
require("dotenv").config();

const port = process.env.PORT;
const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send({ message: "API Is Working Fine" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database Is Connected");
  } catch (err) {
    console.log("Error");
  }

  console.log("Server is running on port", port);
});
