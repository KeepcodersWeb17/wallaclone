export type Sale = "buy" | "sell" | undefined;

export type Advert = {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  sale: Sale;
  image?: string;
  tags?: { _id: string; name: string }[];
  owner?: { _id: string; username: string };
  updatedAt?: string;
  createdAt?: string;
  favorites?: { _id: string; username: string }[];
};

export type User = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  updatedAt?: string;
  createdAt?: string;
};

type State = {
  user: User | null;
  adverts: Advert[];
  advert: Advert | null;
  tags: string[];
};

export default State;
