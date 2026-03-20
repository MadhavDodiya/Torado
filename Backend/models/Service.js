import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    icon: {
      url: String,
      relativeUrl: String,
    },
    featuredImage: {
      url: String,
      relativeUrl: String,
    },
    features: [
      {
        title: String,
        description: String,
      },
    ],
    price: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      enum: ["web", "mobile", "design", "consulting", "other"],
      default: "other",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;