import { Advert } from "../models/Advert.js";
import User from "../models/User.js";

export const getAllAdverts = async (req, res, next) => {
  try {
    const { username } = req.query;
    // validate query params
    // normalize query params => filters
    const filters = {};
    const user = await User.find({ username });
    filters.owner = user._id;
    const adverts = await Advert.findAdverts(filters);
    res.json({ adverts });
  } catch (error) {
    next(error);
  }
};

export const createAdvert = async (req, res, next) => {
  try {
    const advertData = req.body;
    const owner = req.user.id;

    const newAdvert = new Advert({ ...advertData, owner });

    const savedAdvert = await newAdvert.save();

    res.status(201).json({ savedAdvert });
  } catch (error) {
    next(error);
  }
};

export const getAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundAdvert = await Advert.findById(id).populate("owner", "username");

    const { _id: advertId, owner, __v, ...advert } = foundAdvert._doc;

    advert.id = advertId;
    advert.owner = owner.username;

    if (!advert) {
      const error = new Error("Advert not found");
      error.status = 404;
      return next(error);
    }

    res.json(advert);
  } catch (error) {
    next(error);
  }
};

export const deleteAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAdvert = await Advert.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!deletedAdvert) {
      const error = new Error("Advert not found or not owned by user");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Advert deleted" });
  } catch (error) {
    next(error);
  }
};

export const deleteAllAdverts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Advert.deleteMany({ owner: userId });
  } catch (error) {
    next(error);
  }
};

export const updateAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedAdvert = await Advert.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
      },
      updatedData,
      { new: true }
    );

    if (!updatedAdvert) {
      const error = new Error("Advert not found or not owned by user");
      error.status = 404;
      return next(error);
    }

    res.json(updatedAdvert);
  } catch (error) {
    next(error);
  }
};
