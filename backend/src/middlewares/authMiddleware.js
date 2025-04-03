import jwt from "jsonwebtoken";
import Advert from "../models/Advert.js";

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
