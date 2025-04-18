export type Sale = "buy" | "sell" | undefined;

export type Tag = {
  id: string;
  name: string;
};

export type Owner = {
  id: string;
  username: string;
};

type AdvertOriginal = {
  name: string;
  description?: string;
  price: number;
  sale: Sale;
  image?: string;
};

export type AdvertCreate = AdvertOriginal & {
  tags: string;
};

export type AdvertUpdate = Partial<AdvertCreate>;

export type Advert = Required<AdvertOriginal> & {
  id: string;
  tags: Tag[] | string[];
  owner: Owner;
  favorites: Owner[];
  createdAt: string;
  updatedAt: string;
};

export type UserLogin = {
  username: string;
  password: string;
};

export type UserSignup = UserLogin & {
  email: string;
  confirmPassword: string;
};

export type UserUpdate = Partial<UserSignup>;

export type User = {
  id: string;
  username: string;
  email: string;
  updatedAt: string;
  createdAt: string;
};

type State = {
  user: User | null;
  adverts: { list: Advert[]; quantity: number };
  tags: { list: Tag[]; loaded: boolean };
  ui: { loading: boolean; error: string[] | null };
};

export default State;
