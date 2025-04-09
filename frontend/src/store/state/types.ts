type State = {
  user: {
    id: string;
    username: string;
  };
  adverts: Advert[];
  advert?: Advert;
};

export type Advert = {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  tags?: string[];
  owner?: string;
};

export default State;
