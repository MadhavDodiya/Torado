import Team from "../models/Team.js";
import mongoose from "mongoose";

const parsePagination = (query = {}) => {
  const page = Math.max(Number.parseInt(query.page || "1", 10), 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit || "10", 10), 1),
    100
  );
  return { page, limit, skip: (page - 1) * limit };
};

// Get all team members
export const getAllTeamMembers = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const searchQuery = (req.query.q || "").trim();
    const departmentFilter = (req.query.department || "all").trim().toLowerCase();

    const mongoQuery = {};
    if (searchQuery) {
      mongoQuery.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { position: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (departmentFilter !== "all") {
      mongoQuery.department = departmentFilter;
    }

    const [members, total] = await Promise.all([
      Team.find(mongoQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Team.countDocuments(mongoQuery),
    ]);

    return res.status(200).json({
      data: members,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return next(error);
  }
};

// Get single team member
export const getTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid team member id." });
    }

    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found." });
    }

    return res.status(200).json({ data: member });
  } catch (error) {
    return next(error);
  }
};

// Create team member
export const createTeamMember = async (req, res, next) => {
  try {
    const { name, position, bio, email, department, socialLinks, profileImage } = req.body;

    if (!name || !position) {
      return res.status(400).json({ message: "Name and position are required." });
    }

    const member = await Team.create({
      name: name.trim(),
      position: position.trim(),
      bio: bio ? bio.trim() : "",
      email: email ? email.trim() : "",
      department: department || "development",
      socialLinks: socialLinks || {},
      profileImage: profileImage || {},
    });

    return res.status(201).json({
      message: "Team member created successfully.",
      data: member,
    });
  } catch (error) {
    return next(error);
  }
};

// Update team member
export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position, bio, email, department, socialLinks, profileImage, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid team member id." });
    }

    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found." });
    }

    if (name) member.name = name.trim();
    if (position) member.position = position.trim();
    if (bio !== undefined) member.bio = bio?.trim() ?? "";
    if (email !== undefined) member.email = email?.trim() ?? "";
    if (department) member.department = department;
    if (socialLinks) member.socialLinks = socialLinks;
    if (profileImage) member.profileImage = profileImage;
    if (isActive !== undefined) member.isActive = isActive;

    const updated = await member.save();

    return res.status(200).json({
      message: "Team member updated successfully.",
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete team member
export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid team member id." });
    }

    const member = await Team.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found." });
    }

    return res.status(200).json({ message: "Team member deleted successfully." });
  } catch (error) {
    return next(error);
  }
};