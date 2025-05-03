import { handleFetchError } from "../../lib/handleFetchError";
import type { Tag } from "../state/types";

export const getAll = async () => {
  const response = await fetch("http://localhost:4000/tags", {
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    const error = handleFetchError(data);

    throw new Error(error);
  }

  return data.tags as Tag[];
};
