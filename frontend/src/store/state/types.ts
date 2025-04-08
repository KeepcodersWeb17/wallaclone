type State = {
  user: {
    id: string;
    username: string;
  };
};

export type Advert = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  image: string;
  owner: string;
  description: string;
};

export default State;

//
