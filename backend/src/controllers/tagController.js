import Tag from "../models/Tag.js";

export const getAllTags = async (req, res, next) => {
  try {
    const foundTags = await Tag.find();

    const tags = foundTags.map((tag) => ({
      id: tag._id,
      name: tag.name,
    }));

    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// export const createTag = async (req, res, next) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       const error = new Error("Name is required");
//       error.status = 400;
//       next(error);
//       return;
//     }

//     const newTag = new Tag({ name });

//     const savedTag = await newTag.save();

//     res.status(201).json({ savedTag });
//   } catch (error) {
//     next(error);
//   }
// };
