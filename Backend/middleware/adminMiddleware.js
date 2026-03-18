export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized." });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  return next();
};
