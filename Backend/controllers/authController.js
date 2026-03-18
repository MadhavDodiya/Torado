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

export const registerUser = async (req, res, next) => {
  try {
    ensureDBConnection(res);

    const { name, email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: isAdminEmail(user.email),
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    ensureDBConnection(res);

    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: isAdminEmail(user.email),
      },
    });
  } catch (error) {
    return next(error);
  }
};
