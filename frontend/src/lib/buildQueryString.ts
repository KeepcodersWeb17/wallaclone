import type { User, Tag } from "../store/state/types";

export const buildQueryString = ({
  searchParams,
  username,
  user,
  pathname,
  tags
}: {
  searchParams: URLSearchParams;
  username?: string;
  user: User | null;
  pathname: string;
  tags: Tag[];
}) => {
  const queryParams = [];

  if (pathname.includes("/favorites") && username) {
    queryParams.push(`favorites=${user?.id}`);
  }

  if (pathname.includes("/user") && username) {
    queryParams.push(`username=${username}`);
  }

  const name = searchParams.get("name") || "";

  if (name) {
    queryParams.push(`name=${name}`);
  }

  const price = searchParams.get("price") || "";

  if (price) {
    queryParams.push(`price=${price}`);
  }

  const tagsParam = searchParams.get("tags") || "";

  if (tagsParam) {
    const tagsIds: string[] = [];

    tags.forEach((tag) => {
      if (tagsParam.includes(tag.name)) {
        tagsIds.push(tag.id);
      }
    });
    queryParams.push(`tags=${tagsIds.join("-")}`);
  }

  const sort = searchParams.get("sort") || "";

  if (sort) {
    queryParams.push(`sort=${sort}`);
  }

  const skip = searchParams.get("skip") || "";

  if (skip) {
    queryParams.push(`skip=${skip}`);
  }

  const limit = searchParams.get("limit") || "";

  if (limit) {
    queryParams.push(`limit=${limit}`);
  }

  const queryString = queryParams.join("&");

  return queryString;
};
