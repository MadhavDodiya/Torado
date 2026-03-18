export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
};
