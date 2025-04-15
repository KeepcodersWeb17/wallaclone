export const normalizeNameMongo = (nameString) => {
  return new RegExp(`^${nameString}`, "i");
};

export const normalizePriceMongo = (priceString) => {
  // return the normalized price filter
  if (priceString.includes("-")) {
    const priceList = priceString.split("-");

    if (priceList[0] === "") return { $lte: +priceList[1] };

    if (priceList[1] === "") return { $gte: +priceList[0] };

    return { $gte: +priceList[0], $lte: +priceList[1] };
  }
  return +priceString;
};

export const normalizeTagsMongo = (tagsString) => {
  // return normalized tags
  const tagsList = tagsString.toLowerCase().split("-");
  return tagsList;
};

export const normalizeSortMongo = (sortString) => {
  // return normalized sort
  if (sortString === "name-asc") return { name: 1 };
  if (sortString === "name-desc") return { name: -1 };
  if (sortString === "price-asc") return { price: 1 };
  if (sortString === "price-desc") return { price: -1 };
};
