import mongoose from "mongoose";
import Blog from "../models/Blog.js";

const parsePagination = (query = {}) => {
  const page = Math.max(Number.parseInt(query.page || "1", 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit || "10", 10), 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const searchQuery = (req.query.q || "").trim();

    const mongoQuery = { status: "published" };
    if (searchQuery) {
      mongoQuery.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(mongoQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),
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

export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id).select("-__v");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ data: blog });
  } catch (error) {
    return next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, author, category, status, featuredImage } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newBlog = new Blog({
      title: title.trim(),
      slug: title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'),
      content: content.trim(),
      excerpt: excerpt?.trim() || '',
      author: author?.trim() || '',
      category: category || 'other',
      status: status || 'draft',
      ...(featuredImage && { featuredImage }),
    });

    const savedBlog = await newBlog.save();

    return res.status(201).json({ 
      message: "Blog created successfully", 
      data: savedBlog 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Slug already exists. Please use a different title." });
    }
    return next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const updates = req.body;
    if (updates.title) updates.title = updates.title.trim();
    if (updates.content) updates.content = updates.content.trim();
    if (updates.excerpt) updates.excerpt = updates.excerpt.trim();
    if (updates.author) updates.author = updates.author.trim();

    if (updates.title) {
      updates.slug = updates.title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ 
      message: "Blog updated successfully", 
      data: updatedBlog 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Slug already exists." });
    }
    return next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

export const adminGetAllBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const searchQuery = (req.query.q || "").trim();
    const statusFilter = (req.query.status || "").trim();

    const mongoQuery = {};
    if (searchQuery) {
      mongoQuery.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (statusFilter && ["draft", "published"].includes(statusFilter)) {
      mongoQuery.status = statusFilter;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(mongoQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),
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