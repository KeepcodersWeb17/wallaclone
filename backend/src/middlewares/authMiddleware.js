import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  if (!req.cookies.accessToken) {
    const error = new Error("accessToken not provided");
    error.statusCode = 401;
    next(error);
    return;
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid accessToken");
      error.statusCode = 403;
      next(error);
      return;
    }
    req.user = user;
    next();
  });
};

export const isUserOwner = (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    const error = new Error("User ID not provided");
    error.status = 400;
    next(error);
    return;
  }

  if (userId !== req.user.id) {
    const error = new Error("You are not authorized to access this resource");
    error.status = 403;
    next(error);
    return;
  }

  next();
};
