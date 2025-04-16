import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let foundUser = await User.findOne({ username });

    if (!foundUser) {
      foundUser = await User.findOne({ email: username });

      if (!foundUser) {
        const error = new Error("Incorrect username or password");
        error.status = 401;
        next(error);
        return;
      }
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
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
      secure: true, // set to true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200);
  } catch (error) {
    next(error);
  }
};
