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

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (req, res, next) => {
  // get userId from request user object
  // find user by id and delete it
  // if user not found, send error response
  // if user found, send success response
};
