import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImage: {
      url: String,
      relativeUrl: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      github: String,
      website: String,
    },
    department: {
      type: String,
      enum: ["development", "design", "marketing", "management"],
      default: "development",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;