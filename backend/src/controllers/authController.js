import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { setUser } from "../lib/setUser.js";
import { sendResetEmail } from "../lib/sendEmail.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let foundUser = await User.findOne({ username }).populate({
      path: "chats",
      populate: [
        { path: "advert", model: "Advert" },
        { path: "members", model: "User" },
      ],
    });

    if (!foundUser) {
      foundUser = await User.findOne({ email: username }).populate({
        path: "chats",
        populate: [
          { path: "advert", model: "Advert" },
          { path: "members", model: "User" },
        ],
      });

      if (!foundUser) {
        const error = new Error("Incorrect username or password");
        error.status = 401;
        next(error);
        return;
      }
    }

    const isPasswordCorrect = await foundUser.comparePassword(password);

    if (!isPasswordCorrect) {
      const error = new Error("Incorrect username or password");
      error.status = 401;
      next(error);
      return;
    }

    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // set to true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = setUser(foundUser);

    res.json({ user });
  } catch (error) {
    console.log(error);
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

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const recoveryPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
      return;
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // enviar email
    await sendResetEmail(email);
    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
