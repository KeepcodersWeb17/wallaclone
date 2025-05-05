import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  if (!req.cookies.accessToken) {
    const error = new Error("accessToken not provided");
    error.status = 401;
    next(error);
    return;
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid accessToken");
      error.status = 403;
      next(error);
      return;
    }
    req.user = user;
    next();
  });
};

export const validatePassToken = (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    const error = new Error("Token not provided");
    error.status = 401;
    next(error);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid token");
      error.status = 403;
      next(error);
      return;
    }
    req.user = user;
    next();
  });
};
