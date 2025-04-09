import type { User } from "../state/types";

export const login = async (credentials: User) => {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  }).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }

  const { id, username } = response;

  return { id, username };
};

export const logout = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/auth/logout",
    { credentials: "include" }
  );
  if (!response.ok) {
    console.error(response);
    throw new Error(response.statusText);
  }
};

export const createUserAPI = async (userData: User) => {
  const response = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  }).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }

  const { username, email } = response;

  const id = response._id;

  return { id, username, email };
};
