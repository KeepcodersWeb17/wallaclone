import { Advert } from "../models/Advert.js";
import User from "../models/User.js";
import { queryZodSchema } from "../validations/querySchema.js";
import { setAdvert } from "../lib/setAdvert.js";
import { setFiltersOptions } from "../lib/setFiltersOptions.js";

export const getAllAdverts = async (req, res, next) => {
  try {
    const validateQuery = queryZodSchema.parse(req.query);
    const { username } = validateQuery;

    const { filters, options } = setFiltersOptions(validateQuery);

    if (username) {
      const user = await User.findOne({ username });

      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }

      filters.owner = user._id;
    }

    const [foundAdverts, quantity] = await Promise.all([
      Advert.findAdverts(filters, options),
      Advert.countDocuments(filters),
    ]);

    const adverts = foundAdverts.map((advert) => setAdvert(advert));

    res.json({ adverts, quantity });
  } catch (error) {
    next(error);
  }
};

export const createAdvert = async (req, res, next) => {
  try {
    const advertData = req.body;
    const owner = req.user.id;

    const { tags } = advertData.tags.split("-");

    const newAdvert = new Advert({ ...advertData, tags, owner });

    const savedAdvert = await newAdvert.save();

    const populatedAdvert = await savedAdvert.populate([
      { path: "owner", select: "username" },
      { path: "tags", select: "name" },
      { path: "favorites", select: "username" },
    ]);

    const advert = setAdvert(populatedAdvert);

    res.status(201).json({ advert });
  } catch (error) {
    next(error);
  }
};

export const getAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundAdvert = await Advert.findById(id)
      .populate("owner", "username")
      .populate("tags", "name")
      .populate("favorites", "username");

    if (!foundAdvert) {
      const error = new Error("Advert not found");
      error.status = 404;
      return next(error);
    }
    console.log(foundAdvert);
    const advert = setAdvert(foundAdvert);

    res.json({ advert });
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

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const deleteOwnerAdverts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Advert.deleteMany({ owner: userId });
    next();
  } catch (error) {
    next(error);
  }
};

export const updateAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const foundAdvert = await Advert.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
      },
      updatedData,
      { new: true }
    )
      .populate("owner", "username")
      .populate("tags", "name")
      .populate("favorites", "username");

    if (!foundAdvert) {
      const error = new Error("Advert not found or not owned by user");
      error.status = 404;
      return next(error);
    }

    const advert = setAdvert(foundAdvert);

    res.json({ advert });
  } catch (error) {
    next(error);
  }
};

export const toogleFavoriteAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { isFavorite } = req.body;

    const update = isFavorite
      ? { $pull: { favorites: userId } }
      : { $addToSet: { favorites: userId } };

    const foundAdvert = await Advert.findOneAndUpdate({ _id: id }, update, {
      new: true,
    })
      .populate("owner", "username")
      .populate("tags", "name")
      .populate("favorites", "username");

    if (!foundAdvert) {
      const error = new Error("Advert not found");
      error.status = 404;
      return next(error);
    }

    const advert = setAdvert(foundAdvert);

    res.json({ advert });
  } catch (error) {
    next(error);
  }
};
