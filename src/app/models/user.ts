import mongoose, { Schema } from "mongoose";
import { models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;
