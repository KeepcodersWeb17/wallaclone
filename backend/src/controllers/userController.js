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

    res.status(201).json({ username });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      const error = new Error("User ID not provided");
      error.status = 400;
      next(error);
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
