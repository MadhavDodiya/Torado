import Contact from "../models/Contact.js";
import User from "../models/User.js";
import isAdminEmail from "../utils/isAdminEmail.js";

export const getAdminStats = async (req, res, next) => {
  try {
    const [totalUsers, totalContacts, latestUsers, latestContacts] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt"),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject createdAt"),
    ]);

    return res.status(200).json({
      data: {
        totals: {
          users: totalUsers,
          contacts: totalContacts,
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
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("_id name email createdAt");

    const formatted = users.map((user) => ({
      ...user.toObject(),
      isAdmin: isAdminEmail(user.email),
    }));

    return res.status(200).json({ data: formatted });
  } catch (error) {
    return next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select("name email phone subject message createdAt");

    return res.status(200).json({ data: contacts });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

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
