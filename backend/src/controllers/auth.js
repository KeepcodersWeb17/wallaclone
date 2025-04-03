import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPasswordCorrect = await user.comparePassword(password);

    if (!user || !isPasswordCorrect) {
      const error = new Error("Incorrect username or password");
      error.status = 401;
      next(error);
      return;
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
