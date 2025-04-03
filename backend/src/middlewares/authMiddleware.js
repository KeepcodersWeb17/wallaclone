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

export const checkUserOwnership = (req, res, next) => {
  // get userId from the request params
  // get userId from the request user object
  // compare the two userIds
  // if they are not equal, return an error
  // if they are equal, call next()
};
