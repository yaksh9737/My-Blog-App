const blogModel = require("../Model/blog");


const blog = async (req, res) => {

  try {
    const posts = await blogModel
      .find({ userId: req.userId })
      .sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ err});
    console.log(err)
  }
};

const blogCreate = async (req, res) => {
    const { title, description, author } = req.body;

    try {
        const newPost = new blogModel({
            title,
            description,
            author,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: "Failed to create post" });
    }
};

const blogDelete = async (req, res) => {

  const { id } = req.params;
  try {
    const deletedPost = await blogModel.findOneAndDelete({
      _id: id,
    });
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

const blogUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, description, author } = req.body;

  try {
    const updatedPost = await blogModel.findOneAndUpdate(
      { _id: id },
      { title, description, author },
      { new: true, runValidators: true } 
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to update post" });
  }
};


const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await blogModel.findOne({ _id: id, userId: req.userId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { blog, blogCreate, blogDelete, blogUpdate, getById };
