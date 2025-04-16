type Params = {
  username?: string;
  name?: string;
  price?: string;
  tags?: string;
  skip?: string;
  limit?: string;
  sort?: string;
};

export const getParamsFilters = ({
  filters,
  tagsFilters,
  searchParams
}: {
  filters: string[];
  tagsFilters: string;
  searchParams: URLSearchParams;
}) => {
  const params: Params = {};

  if (filters[0]) {
    params.name = filters[0];
  }

  if (filters[1]) {
    params.price = `${filters[1]}-`;
  }

  if (filters[2]) {
    params.price = params.price
      ? `${filters[1]}-${filters[2]}`
      : `-${filters[2]}`;
  }

  if (tagsFilters) {
    params.tags = tagsFilters;
  }

  const skip = searchParams.get("skip") || "";

  if (skip) {
    // Cuando aplicamos un filtro queremos volver a la primera pagina
    params.skip = "";
  }

  const limit = searchParams.get("limit") || "";

  if (limit) {
    params.limit = limit;
  }

  const sort = searchParams.get("sort") || "";

  if (sort) {
    params.sort = sort;
  }

  return params;
};
