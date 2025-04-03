import jwt from "jsonwebtoken";
import Advert from "../models/Advert.js";

export const isAuthenticated = (req, res, next) => {
  if (!req.cookies.accessToken) {
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

export const isOwner = async (req, res, next) => {
  const advertId = req.params.id;
  const userId = req.user.id;

  if (!advertId) {
    const error = new Error("advertId not provided");
    error.statusCode = 400;
    next(error);
    return;
  }

  if (!userId) {
    const error = new Error("userId not provided");
    error.statusCode = 400;
    next(error);
    return;
  }

  const advert = await Advert.findById(advertId);

  if (!advert) {
    const error = new Error("advert not found");
    error.statusCode = 404;
    next(error);
    return;
  }

  if (advert.owner.toString() !== userId) {
    const error = new Error("user not allowed to access this advert");
    error.statusCode = 401;
    next(error);
    return;
  }

  next();
};
