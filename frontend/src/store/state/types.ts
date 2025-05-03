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
  id?: string;
  _id?: string;
  tags: Tag[];
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

export type Message = {
  sender: { id: string; username: string };
  content: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  advert: Advert;
  members: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  chats: Chat[];
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
