import Contact from "../models/Contact.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const CONTACT_STATUSES = ["new", "in_progress", "resolved"];

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
      totalContacts,
      resolvedContacts,
      inProgressContacts,
      latestUsers,
      latestContacts,
    ] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "resolved" }),
      Contact.countDocuments({ status: "in_progress" }),
      User.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt"),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject status createdAt"),
    ]);

    const totalAdmins = totalUsers;
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
        .select("_id name email createdAt"),
      User.countDocuments(mongoQuery),
    ]);

    const formattedUsers = users.map((user) => ({
      ...user.toObject(),
      isAdmin: true,
    }));

    const filteredByRole =
      roleFilter === "all"
        ? formattedUsers
        : formattedUsers.filter((user) =>
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

    if (req.user.id === id) {
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
