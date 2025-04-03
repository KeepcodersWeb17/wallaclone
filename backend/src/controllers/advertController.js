import { Advert } from "../models/Advert";

export const getAllAdverts = async (req, res, next) => {
  try {
    // El método populate rellena el campo owner con la proiedad username del User
    const adverts = await Advert.find().populate("owner", "username");
    res.json({ adverts });
  } catch (error) {
    next(error);
  }
};

export const createAdvert = async (req, res, next) => {
  try {
    const { name, description, price, image, tags } = req.body;
    const owner = req.user.id;

    const newAdvert = new Advert({
      name,
      description,
      price,
      image,
      tags,
      owner,
    });

    const savedAdvert = await newAdvert.save();

    res.status(201).json({ advert: savedAdvert });
  } catch (error) {
    next(error);
  }
};

export const getAdvert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const advert = await Advert.findById(id);

    if (!advert) {
      const error = new Error("Advert not found");
      error.status = 404;
      return next(error);
    }

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

    res.json({ message: "Advert deleted" });
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

    res.json({ message: "Advert updated", advert: updateAdvert });
  } catch (error) {
    next(error);
  }
};
