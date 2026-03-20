import Blog from "../models/Blog.js";
import mongoose from "mongoose";

const parsePagination = (query = {}) => {
  const page = Math.max(Number.parseInt(query.page || "1", 10), 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit || "10", 10), 1),
    100
  );
  return { page, limit, skip: (page - 1) * limit };
};

const sanitizeSlug = (title) =>
  String(title)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// Get all blogs (with pagination and filtering)
export const getAllBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const searchQuery = (req.query.q || "").trim();
    const statusFilter = (req.query.status || "all").trim().toLowerCase();

    const mongoQuery = {};
    if (searchQuery) {
      mongoQuery.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
        { author: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (statusFilter !== "all") {
      mongoQuery.status = statusFilter;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(mongoQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("_id title slug author status category views createdAt"),
      Blog.countDocuments(mongoQuery),
    ]);

    return res.status(200).json({
      data: blogs,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return next(error);
  }
};

// Get single blog
export const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ data: blog });
  } catch (error) {
    return next(error);
  }
};

// Create blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, author, category, status, featuredImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const slug = sanitizeSlug(title);
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(409).json({ message: "Blog with this title already exists." });
    }

    const blog = await Blog.create({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt ? excerpt.trim() : "",
      author: author ? author.trim() : "",
      category: category || "other",
      status: status || "draft",
      featuredImage: featuredImage || {},
    });

    return res.status(201).json({
      message: "Blog created successfully.",
      data: blog,
    });
  } catch (error) {
    return next(error);
  }
};

// Update blog
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, author, category, status, featuredImage } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Update slug if title changed
    if (title && title !== blog.title) {
      const newSlug = sanitizeSlug(title);
      const existing = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ message: "Blog with this title already exists." });
      }
      blog.slug = newSlug;
    }

    if (title) blog.title = title.trim();
    if (content) blog.content = content.trim();
    if (excerpt !== undefined) blog.excerpt = excerpt.trim();
    if (author !== undefined) blog.author = author.trim();
    if (category) blog.category = category;
    if (status) blog.status = status;
    if (featuredImage) blog.featuredImage = featuredImage;

    const updated = await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully.",
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id." });
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    return next(error);
  }
};

// Publish blog
export const publishBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id." });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        status: "published",
        published_date: new Date(),
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({
      message: "Blog published successfully.",
      data: blog,
    });
  } catch (error) {
    return next(error);
  }
};