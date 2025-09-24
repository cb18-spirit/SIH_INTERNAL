import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  media: String,  // file path
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
