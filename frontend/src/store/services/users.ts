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
  ).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }

  return response.user;
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
  ).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
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
  ).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }
};

// TODO: UPDATE
