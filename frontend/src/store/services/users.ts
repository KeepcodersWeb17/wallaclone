import { handleFetchError } from "../../lib/handleFetchError";
import type { User } from "../state/types";

export const login = async (credentials: User) => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/auth/login",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = handleFetchError(data);

    throw new Error(error);
  }

  // deberiamos validar con Zod
  return data.user as User;
};

export const logout = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/auth/logout",
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const create = async (userData: User) => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/users",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData)
    }
  );

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

    throw new Error(error);
  }
};

export const remove = async () => {
  const response = await fetch(
    `https://api.wallaclone.keepcoders.duckdns.org/users/`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "include"
    }
  );

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

    throw new Error(error);
  }
};

// TODO: UPDATE
