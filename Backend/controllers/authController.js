import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import isAdminEmail from "../utils/isAdminEmail.js";

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const ensureDBConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503);
    throw new Error("Database is not connected. Please try again later.");
  }
};

const buildAuthResponse = (user, message) => ({
  message,
  token: generateToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: Boolean(user.isAdmin),
  },
});

export const registerUser = async (req, res, next) => {
  try {
    ensureDBConnection(res);

    const { name, email, password } = req.body;
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = normalizeEmail(email);
    const passwordValue = typeof password === "string" ? password : "";

    if (!normalizedName || !normalizedEmail || !passwordValue) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    if (passwordValue.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(passwordValue, 10);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      isAdmin: isAdminEmail(normalizedEmail),
    });

    return res.status(201).json(buildAuthResponse(user, "Registration successful"));
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    ensureDBConnection(res);

    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const passwordValue = typeof password === "string" ? password : "";

    if (!normalizedEmail || !passwordValue) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(passwordValue, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json(buildAuthResponse(user, "Login successful"));
  } catch (error) {
    return next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    ensureDBConnection(res);

    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const passwordValue = typeof password === "string" ? password : "";

    if (!normalizedEmail || !passwordValue) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(passwordValue, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    return res.status(200).json(buildAuthResponse(user, "Admin login successful"));
  } catch (error) {
    return next(error);
  }
};
