import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  farmLocation: String,
  farmSize: Number,
  crops: [String],
  bio: String,
});

export default mongoose.model("User", userSchema);
