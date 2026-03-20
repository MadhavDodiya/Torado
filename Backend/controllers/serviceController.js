import Service from "../models/Service.js";
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

// Get all services
export const getAllServices = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const searchQuery = (req.query.q || "").trim();
    const categoryFilter = (req.query.category || "all").trim().toLowerCase();

    const mongoQuery = {};
    if (searchQuery) {
      mongoQuery.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (categoryFilter !== "all") {
      mongoQuery.category = categoryFilter;
    }

    const [services, total] = await Promise.all([
      Service.find(mongoQuery)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Service.countDocuments(mongoQuery),
    ]);

    return res.status(200).json({
      data: services,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return next(error);
  }
};

// Get single service
export const getService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service id." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.status(200).json({ data: service });
  } catch (error) {
    return next(error);
  }
};

// Create service
export const createService = async (req, res, next) => {
  try {
    const { title, description, shortDescription, category, price, featuredImage, icon, features } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const slug = sanitizeSlug(title);
    const existingService = await Service.findOne({ slug });
    if (existingService) {
      return res.status(409).json({ message: "Service with this title already exists." });
    }

    const service = await Service.create({
      title: title.trim(),
      slug,
      description: description.trim(),
      shortDescription: shortDescription ? shortDescription.trim() : "",
      category: category || "other",
      price: price || null,
      featuredImage: featuredImage || {},
      icon: icon || {},
      features: features || [],
    });

    return res.status(201).json({
      message: "Service created successfully.",
      data: service,
    });
  } catch (error) {
    return next(error);
  }
};

// Update service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, shortDescription, category, price, featuredImage, icon, features, isActive, displayOrder } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service id." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    // Update slug if title changed
    if (title && title !== service.title) {
      const newSlug = sanitizeSlug(title);
      const existing = await Service.findOne({ slug: newSlug, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ message: "Service with this title already exists." });
      }
      service.slug = newSlug;
    }

    if (title) service.title = title.trim();
    if (description) service.description = description.trim();
    if (shortDescription !== undefined) service.shortDescription = shortDescription?.trim() ?? "";
    if (category) service.category = category;
    if (price !== undefined) service.price = price;
    if (featuredImage) service.featuredImage = featuredImage;
    if (icon) service.icon = icon;
    if (features) service.features = features;
    if (isActive !== undefined) service.isActive = isActive;
    if (displayOrder !== undefined) service.displayOrder = displayOrder;

    const updated = await service.save();

    return res.status(200).json({
      message: "Service updated successfully.",
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete service
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service id." });
    }

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    return next(error);
  }
};