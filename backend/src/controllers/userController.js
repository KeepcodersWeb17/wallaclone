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

export const getUser = (req, res, next) => {
  try {
    // Get user ID from request parameters
    // Check if user ID is provided
    // If not, return an error response
    // If user ID is provided, find the user in the database
    // If user is found, return user data
    // If user is not found, return an error response
  } catch (error) {
    next(error);
  }
};
