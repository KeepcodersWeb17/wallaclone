type State = {
  user: {
    id: string;
    username: string;
  };
  adverts: Advert[];
  advert: Advert | null;
};

export type Advert = {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  sale: "buy" | "sell";
  image?: string;
  tags?: string[];
  owner?: string;
};

export default State;
