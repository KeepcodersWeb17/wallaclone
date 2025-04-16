export type Sale = "buy" | "sell" | undefined;

export type Tag = {
  id: string;
  name: string;
};

export type Owner = {
  id: string;
  username: string;
};

export type Advert = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  sale: Sale;
  image?: string;
  tags?: Tag[];
  owner?: Owner;
  favorites?: Owner[];
  createdAt?: string;
  updatedAt?: string;
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
  tags: Tag[];
};

export default State;
