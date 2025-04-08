type State = {
  user: {
    id: string;
    username: string;
  };
};

export type Advert = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  tags?: string[];
  owner?: string;
};

export default State;
