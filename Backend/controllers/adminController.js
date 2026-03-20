import Contact from "../models/Contact.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const CONTACT_STATUSES = ["new", "in_progress", "resolved"];
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIRECTORY = path.resolve(__dirname, "../uploads/content");

const parsePagination = (query = {}) => {
  const page = Math.max(Number.parseInt(query.page || "1", 10), 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit || "10", 10), 1),
    100
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const getAdminStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalAdmins,
      totalContacts,
      resolvedContacts,
      inProgressContacts,
      latestUsers,
      latestContacts,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isAdmin: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "resolved" }),
      Contact.countDocuments({ status: "in_progress" }),
      User.find().sort({ createdAt: -1 }).limit(5).select("name email isAdmin createdAt"),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject status createdAt"),
    ]);

    const newContacts = totalContacts - resolvedContacts - inProgressContacts;

    return res.status(200).json({
      data: {
        totals: {
          users: totalUsers,
          admins: totalAdmins,
          contacts: totalContacts,
          newContacts,
          inProgressContacts,
          resolvedContacts,
        },
        latestUsers,
        latestContacts,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const queryValue = (req.query.q || "").trim();
    const roleFilter = (req.query.role || "all").trim().toLowerCase();

    const mongoQuery = queryValue
      ? {
          $or: [
            { name: { $regex: queryValue, $options: "i" } },
            { email: { $regex: queryValue, $options: "i" } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(mongoQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("_id name email isAdmin createdAt"),
      User.countDocuments(mongoQuery),
    ]);

    const filteredByRole =
      roleFilter === "all"
        ? users
        : users.filter((user) =>
            roleFilter === "admin" ? user.isAdmin : !user.isAdmin
          );

    return res.status(200).json({
      data: filteredByRole,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const queryValue = (req.query.q || "").trim();
    const statusFilter = (req.query.status || "all").trim().toLowerCase();

    const mongoQuery = {};
    if (queryValue) {
      mongoQuery.$or = [
        { name: { $regex: queryValue, $options: "i" } },
        { email: { $regex: queryValue, $options: "i" } },
        { subject: { $regex: queryValue, $options: "i" } },
        { message: { $regex: queryValue, $options: "i" } },
        { phone: { $regex: queryValue, $options: "i" } },
      ];
    }

    if (statusFilter !== "all" && CONTACT_STATUSES.includes(statusFilter)) {
      mongoQuery.status = statusFilter;
    }

    const [contacts, total] = await Promise.all([
      Contact.find(mongoQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("name email phone subject message status createdAt"),
      Contact.countDocuments(mongoQuery),
    ]);

    return res.status(200).json({
      data: contacts,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const statusValue = (req.body.status || "").trim().toLowerCase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    if (!CONTACT_STATUSES.includes(statusValue)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed: new, in_progress, resolved.",
      });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status: statusValue },
      { new: true, runValidators: true }
    ).select("name email phone subject message status createdAt");

    if (!updated) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res
      .status(200)
      .json({ message: "Contact status updated successfully.", data: updated });
  } catch (error) {
    return next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id." });
    }

    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "You cannot delete yourself." });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return next(error);
  }
};

const sanitizeBaseFileName = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const extensionFromMimeType = (mimeType = "") => {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return "";
  }
};

export const uploadAdminImage = async (req, res, next) => {
  try {
    const { fileName, mimeType, data } = req.body || {};
    const normalizedMimeType = String(mimeType || "").trim().toLowerCase();

    if (!ALLOWED_IMAGE_MIME_TYPES.has(normalizedMimeType)) {
      return res.status(400).json({
        message: "Only image files are allowed (jpg, png, webp, gif, svg).",
      });
    }

    const dataUrlPrefix = `data:${normalizedMimeType};base64,`;
    const rawData = String(data || "");
    const base64Payload = rawData.startsWith(dataUrlPrefix)
      ? rawData.slice(dataUrlPrefix.length)
      : rawData;

    if (!base64Payload) {
      return res.status(400).json({ message: "Image data is required." });
    }

    const buffer = Buffer.from(base64Payload, "base64");
    if (!buffer.length) {
      return res.status(400).json({ message: "Image data is invalid." });
    }

    if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
      return res
        .status(400)
        .json({ message: "Image size should be less than 10MB." });
    }

    const originalName = sanitizeBaseFileName(fileName || "image");
    const ext = extensionFromMimeType(normalizedMimeType);
    const baseName = originalName.replace(/\.[a-z0-9]+$/i, "") || "image";
    const safeFileName = `${baseName}-${Date.now()}-${Math.round(
      Math.random() * 1e6
    )}.${ext}`;

    await fs.mkdir(UPLOAD_DIRECTORY, { recursive: true });
    const absolutePath = path.join(UPLOAD_DIRECTORY, safeFileName);
    await fs.writeFile(absolutePath, buffer);

    const relativeUrl = `/uploads/content/${safeFileName}`;
    const fullUrl = `${req.protocol}://${req.get("host")}${relativeUrl}`;

    return res.status(201).json({
      message: "Image uploaded successfully.",
      data: {
        fileName: safeFileName,
        mimeType: normalizedMimeType,
        size: buffer.length,
        url: fullUrl,
        relativeUrl,
      },
    });
  } catch (error) {
    return next(error);
  }
};