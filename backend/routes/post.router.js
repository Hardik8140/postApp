const express = require("express");
const { PostModel } = require("../model/posts.model");
const { auth } = require("../middlewares/auth");

const postRouter = express.Router();
postRouter.use(auth);

postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.status(200).json({ msg: "New Post added Successful!!" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const { device } = req.query;
    const query = {};
    if (device) {
      query = { device: { $regex: device, $options: "i" } };
    }
    const post = await PostModel.find({ name: req.body.name }, query);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatePost = req.body;
  const name = req.body.name;
  try {
    const updatePosts = await PostModel.findByIdAndUpdate(
      { _id: id, name },
      updatePost,
      { new: true }
    );
    if (!updatePosts) {
      res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json({ msg: "Post update successfully!" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const deletePosts = await PostModel.findByIdAndDelete({ _id: id, name });
    if (!deletePosts) {
      res.status(404).json({ msg: "Post not deleted" });
    }
    res.status(200).json({ msg: "Post deleted successfully!" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = { postRouter };
