export type Sale = "buy" | "sell" | undefined;

export type Advert = {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  sale: Sale;
  image?: string;
  tags?: string[];
  owner?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type User = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
};

type State = {
  user: {
    id: string;
    username: string;
  };
  adverts: Advert[];
  advert: Advert | null;
};

export default State;
