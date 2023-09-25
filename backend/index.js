const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { postRouter } = require("./routes/post.router");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to the homepage" });
  } catch (error) {
    res.status(200).json({ err: error });
  }
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log(`Server running on the port ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
