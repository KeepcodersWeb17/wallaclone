import { handleFetchError } from "../../lib/handleFetchError";
import type { User, UserLogin, UserSignup, UserUpdate } from "../state/types";
import socket from "./socket";

export const login = async (credentials: UserLogin) => {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = handleFetchError(data);

    throw new Error(error);
  }

  console.log(data.user);

  // deberiamos validar con Zod
  return data.user as User;
};

export const logout = async () => {
  const response = await fetch("http://localhost:4000/auth/logout", {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  socket.disconnect();
};

export const create = async (userData: UserSignup) => {
  const response = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

    throw new Error(error);
  }
};

export const remove = async () => {
  const response = await fetch(`http://localhost:4000/users/`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    credentials: "include"
  });

  if (!response.ok) {
    const data = await response.json();

    const error = handleFetchError(data);

    throw new Error(error);
  }
};

export const update = async (userData: UserUpdate) => {
  const response = await fetch("http://localhost:4000/users", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData)
  });
  const data = await response.json();

  if (!response.ok) {
    const error = handleFetchError(data);

    throw new Error(error);
  }

  return data.user as User;
};
