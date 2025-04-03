export const isAuthenticated = (req, res, next) => {
  if (!req.cookies.access_token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};
