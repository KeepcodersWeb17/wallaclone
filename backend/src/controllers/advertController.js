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
      const tagsIds = normalizeTagsMongo(tags);
      filters.tags = { $all: tagsIds };
    }

    if (sale) {
      filters.sale = sale;
    }

    // creamos un objeto options para los filtros de mongoose
    const options = {
      limit: limit ? parseInt(limit) : 5,
      skip: skip ? parseInt(skip) : 0,
      sort: sort ? normalizeSortMongo(sort) : { updatedAt: -1 },
      fields,
    };

    const [foundAdverts, quantity] = await Promise.all([
      Advert.findAdverts(filters, options),
      Advert.countDocuments(filters),
    ]);

    const adverts = foundAdverts.map((advert) => ({
      id: advert._id,
      name: advert.name,
      description: advert.description,
      price: advert.price,
      sale: advert.sale,
      image: advert.image,
      tags: advert.tags.map((tag) => ({ id: tag._id, name: tag.name })),
      owner: { id: advert.owner._id, username: advert.owner.username },
      favorites: advert.favorites.map((user) => ({
        id: user._id,
        username: user.username,
      })),
      createdAt: advert.createdAt,
      updatedAt: advert.updatedAt,
    }));

    res.json({ adverts, quantity });
  } catch (error) {
    next(error);
  }
};

export const createAdvert = async (req, res, next) => {
  try {
    const advertData = req.body;
    const owner = req.user.id;

    const newAdvert = new Advert({ ...advertData, owner });

    await newAdvert.save();

    res.status(201).json({ advert: newAdvert });
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

    const advert = {
      id: foundAdvert._id,
      name: foundAdvert.name,
      description: foundAdvert.description,
      price: foundAdvert.price,
      sale: foundAdvert.sale,
      image: foundAdvert.image,
      tags: foundAdvert.tags.map((tag) => ({ id: tag._id, name: tag.name })),
      owner: {
        id: foundAdvert.owner._id,
        username: foundAdvert.owner.username,
      },
      favorites: foundAdvert.favorites.map((user) => ({
        id: user._id,
        username: user.username,
      })),
      createdAt: foundAdvert.createdAt,
      updatedAt: foundAdvert.updatedAt,
    };

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
    );

    if (!foundAdvert) {
      const error = new Error("Advert not found or not owned by user");
      error.status = 404;
      return next(error);
    }

    res.json({ advert: foundAdvert });
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

    const advert = {
      id: foundAdvert._id,
      name: foundAdvert.name,
      description: foundAdvert.description,
      price: foundAdvert.price,
      sale: foundAdvert.sale,
      image: foundAdvert.image,
      tags: foundAdvert.tags.map((tag) => ({ id: tag._id, name: tag.name })),
      owner: {
        id: foundAdvert.owner._id,
        username: foundAdvert.owner.username,
      },
      favorites: foundAdvert.favorites.map((user) => ({
        id: user._id,
        username: user.username,
      })),
      createdAt: foundAdvert.createdAt,
      updatedAt: foundAdvert.updatedAt,
    };

    res.json({ advert });
  } catch (error) {
    next(error);
  }
};
