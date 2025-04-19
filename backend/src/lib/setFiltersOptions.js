import {
  normalizeNameMongo,
  normalizePriceMongo,
  normalizeTagsMongo,
  normalizeSortMongo,
} from "./normalize.js";

export const setFiltersOptions = (validateQuery) => {
  const { name, price, tags, favorites, sale, skip, limit, sort, fields } =
    validateQuery;

  // creamos un objeto filters para los filtros de mongoose
  const filters = {};

  // si el query param existe lo agregamos al objeto filters luego de normalizarlo
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

  // creamos un objeto options para paginacion y ordenado
  const options = {
    limit: limit ? parseInt(limit) : 5,
    skip: skip ? parseInt(skip) : 0,
    sort: sort ? normalizeSortMongo(sort) : { updatedAt: -1 },
    fields,
  };

  return { filters, options };
};
