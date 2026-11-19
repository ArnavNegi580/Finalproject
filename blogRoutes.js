
const express = require("express");
const Blog = require("../Models/blog");
const authMiddleware = require("../Middleware/authmiddleware");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch blogs"
    });
  }
});

// Get logged-in user's blogs
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user.id
    }).sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch your blogs"
    });
  }
});

// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(400).json({
      message: "Invalid blog ID"
    });
  }
});

// Create blog
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user.id
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create blog"
    });
  }
});

// Update blog
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user.id
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized"
      });
    }

    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    blog.title = title.trim();
    blog.content = content.trim();

    await blog.save();

    res.json({
      message: "Blog updated successfully",
      blog
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to update blog"
    });
  }
});

// Delete blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized"
      });
    }

    res.json({
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete blog"
    });
  }
});

module.exports = router;
