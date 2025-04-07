export interface Credentials {
  username: string;
  password: string;
}
export const login = async (credentials: Credentials) => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/auth/login",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    }
  );
  if (!response.ok) {
    console.error(response);
    throw new Error(response.statusText);
  }
  const { id, username } = await response.json();

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
