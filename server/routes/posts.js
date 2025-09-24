import express from "express";
import multer from "multer";
import aboutposts from "../models/aboutposts.js";
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get posts by user
router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await aboutposts.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new post
router.post("/:id/posts", upload.single("media"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const media = req.file ? req.file.path : null;

    const post = await aboutposts.create({
      userId: req.params.id,
      title,
      content,
      media,
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
