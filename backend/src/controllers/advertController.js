import { Advert } from "../models/Advert.js";
import User from "../models/User.js";
import { queryZodSchema } from "../validations/querySchema.js";
import {
  normalizeNameMongo,
  normalizePriceMongo,
  normalizeTagsMongo,
  normalizeSortMongo,
} from "../lib/normalize.js";
import Tag from "../models/Tag.js";

export const getAllAdverts = async (req, res, next) => {
  try {
    // ejemplo query string
    // ?username=agustin&name=iphone&price=500-1000&tags=tag1,tag2&sale=sell&skip=0&limit=5&sort=name-asc

    //validamos los query params utilizando zod
    const validateQuery = queryZodSchema.parse(req.query);

    // obtenemos todos los query params
    const {
      username,
      name,
      price,
      tags,
      favorites,
      sale,
      skip,
      limit,
      sort,
      fields,
    } = validateQuery;

    const filters = {};

    // si el query param existe lo agregamos al objeto filters luego de normalizarlo

    if (username) {
      // con esta RegExp queremos que el username sea case insensitive
      // const usernameRegExp = new RegExp(`^${username}`, "i"); // la busqueda debe ser exacta
      const user = await User.findOne({ username });

      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }

      filters.owner = user._id;
    }

    if (favorites) {
      filters.favorites = favorites;
    }

    if (name) {
      filters.name = normalizeNameMongo(name);
    }

    if (price) {
      filters.price = normalizePriceMongo(price);
    }

    if (tags) {
      const tagsNames = normalizeTagsMongo(tags);
      const tagsIds = await Tag.find({ name: { $in: tagsNames } }).select(
        "_id"
      );
      filters.tags = { $all: tagsIds };
    }

    if (sale) {
      filters.sale = sale;
    }

    // creamos un objeto options para los filtros de mongoose
    const options = {
      limit,
      skip,
      sort: normalizeSortMongo(sort),
      fields,
    };

    // const adverts = await Advert.findAdverts(filters);
    // const quantity = await Advert.countDocuments(filters);

    const [adverts, quantity] = await Promise.all([
      Advert.findAdverts(filters, options),
      Advert.countDocuments(filters),
    ]);

    res.json({ adverts, quantity });
  } catch (error) {
    next(error);
  }
};

export const createAdvert = async (req, res, next) => {
  try {
    const advertData = req.body;
    const owner = req.user.id;

    const tagsIds = await Tag.find({ name: { $in: advertData.tags } }).select(
      "_id"
    );

    const newAdvert = new Advert({ ...advertData, owner, tags: tagsIds });

    const savedAdvert = await newAdvert.save();

    res.status(201).json({ savedAdvert });
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

    const { _id: advertId, __v, ...advert } = foundAdvert._doc;

    advert.id = advertId;

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

    const { _id: advertId, owner, __v, ...advert } = deletedAdvert._doc;

    advert.id = advertId;
    advert.owner = owner.username;

    if (!deletedAdvert) {
      const error = new Error("Advert not found or not owned by user");
      error.status = 404;
      return next(error);
    }

    res.json(advert);
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

export const toogleFavoriteAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { isFavorite } = req.body;

    const update = isFavorite
      ? { $pull: { favorites: userId } }
      : { $addToSet: { favorites: userId } };

    const updatedAdvert = await Advert.findOneAndUpdate(
      { _id: id },
      update, // actualiza el campo favorites
      { new: true } // devuelve el documento actualizado, no el original
    );

    if (!updatedAdvert) {
      const error = new Error("Advert not found");
      error.status = 404;
      return next(error);
    }

    res.json(updatedAdvert);
  } catch (error) {
    next(error);
  }
};
