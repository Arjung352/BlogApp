const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinaryConfig");
const Blog = require("../model/blog");
const User = require("../model/user");
const blog = require("../model/blog");
const cloudinary = require("cloudinary").v2; // Ensure you have configured Cloudinary

const upload = multer({ storage });
// Creating a new blog
router.post("/create-blog", upload.single("img"), async (req, res) => {
  try {
    const { title, desc, username } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msesage: "User not found" });
    }

    // Cloudinary image URL
    const imgUrl = req.file
      ? req.file.path
      : "https://cdn1.iconfinder.com/data/icons/ui-icon-part-3/128/image-512.png";

    // Create a new blog
    const newBlog = new Blog({
      title,
      desc,
      userName: username,
      img: imgUrl, // Store the Cloudinary image URL
      createdBy: user._id, // Reference the user who created the blog
    });

    // Save the blog
    const savedBlog = await newBlog.save();

    // Add the blog reference to the user's blog array
    user.blog.push(savedBlog._id);
    await user.save();

    // Return a success message
    res
      .status(200)
      .json({ message: "Blog created successfully", blog: savedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// show all post
router.get("/display-all", async (req, res) => {
  try {
    let blogs = await blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({ data: blogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Show specific info of a blog
router.get("/show/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// edit the specific blog
router.put("/update-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await blog.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "task updated succesfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// delete a specific task
router.delete("/delete-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // Find the particular blog
    const particularBlog = await Blog.findById(id);
    if (!particularBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update the user by pulling out the blog ID
    await User.findOneAndUpdate(
      { username: username },
      { $pull: { blog: id } },
      { new: true }
    );

    // Extract public_id from the image URL
    const imagePublicId = particularBlog.img.split("/").pop().split(".")[0];

    // Wait for Cloudinary image deletion
    const cloudinaryResult = await cloudinary.uploader.destroy(imagePublicId);
    console.log(cloudinaryResult);

    // Delete the blog from the database
    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// like a request
router.post("/like-blog/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the blog ID from the request parameters
    const { username } = req.body; // Get the username from the request body

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likeBlog = await blog.findByIdAndUpdate(
      id,
      { $addToSet: { likes: user._id } },
      { new: true }
    );

    if (!likeBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Liked successfully", blog: likeBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
