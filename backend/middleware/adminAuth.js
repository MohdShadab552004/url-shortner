export const adminAuth =(req, res, next) => {
  const token = req.headers["x-admin-token"];
  if (token === process.env.ADMIN_TOKEN) {
    return next();
  }
  return res.status(403).json({ error: "Forbidden - Invalid admin token" });
};