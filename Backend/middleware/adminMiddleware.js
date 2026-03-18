import isAdminEmail from "../utils/isAdminEmail.js";

export const adminOnly = (req, res, next) => {
  if (!req.user || !isAdminEmail(req.user.email)) {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
};
