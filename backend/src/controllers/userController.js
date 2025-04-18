import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      if (user.email === email) {
        const error = new Error("Email already exists");
        error.status = 400;
        next(error);
        return;
      }
      if (user.username === username) {
        const error = new Error("Username already exists");
        error.status = 400;
        next(error);
        return;
      }
    }

    const hashedPassword = await User.hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
      return;
    }

    const user = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { username, email, password } = req.body;

    const updatedData = {};

    if (username) {
      updatedData.username = username;
    }

    if (email) {
      updatedData.email = email;
    }

    if (password) {
      const hashedPassword = await User.hashPassword();
      updatedData.password = hashedPassword;
    }

    const foundUser = await User.findOneAndUpdate(
      { _id: userId },
      updatedData,
      { new: true }
    );

    if (!foundUser) {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
      return;
    }

    const user = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };

    res.status(204).json({ user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
