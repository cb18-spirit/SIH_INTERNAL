import express from "express";
import userAuth from "../middleware/userAuth.js";
import aboutuser from "../models/aboutuser.js";

const router = express.Router();

// -----------------
// Get logged-in user's profile
// -----------------
router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await aboutuser.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// -----------------
// Get user by ID (optional, public or admin use)
// -----------------
router.get("/:id", async (req, res) => {
  try {
    const user = await aboutuser.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------
// Update user
// -----------------
// Update logged-in user
router.put("/profile", userAuth, async (req, res) => {
  try {
    const updatedUser = await aboutuser.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.json({ success: true, updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;

