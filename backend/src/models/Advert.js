import mongoose from "mongoose";

const advertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true, index: true },
    image: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: [String], index: true },
    sale: { type: String, enum: ["sell", "buy"], required: true },
  },
  {
    timestamps: true,
    statics: {
      // /adverts?limit=5&skip=0&sort=updatedAt-1
      findAdverts: async function (
        filters = {},
        options = { limit: 5, skip: 0, sort: { updatedAt: -1 } }
      ) {
        return (
          Advert.find(filters)
            // collation to make insensitive the sorting by name
            .collation({ locale: "en", strength: 2 })
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit)
            .select(options.fields)
            .exec()
        );
      },
    },
  }
);

export const Advert = mongoose.model("Advert", advertSchema);
