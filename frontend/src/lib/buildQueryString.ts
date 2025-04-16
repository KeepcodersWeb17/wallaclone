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
  let queryString = "";

  if (pathname.includes("/favorites") && username) {
    queryString += `favorites=${user?.id}&`;
  }

  if (pathname.includes("/user") && username) {
    queryString += `username=${username}&`;
  }

  const name = searchParams.get("name") || "";

  if (name) {
    queryString += `name=${name}&`;
  }

  const price = searchParams.get("price") || "";

  if (price) {
    queryString += `price=${price}&`;
  }

  const tagsParam = searchParams.get("tags") || "";

  if (tagsParam) {
    const tagsIds: string[] = [];

    tags.forEach((tag) => {
      if (tagsParam.includes(tag.name)) {
        tagsIds.push(tag.id);
      }
    });

    queryString += `tags=${tagsIds.join("-")}&`;
  }

  queryString.slice(0, -1);

  return queryString;
};
