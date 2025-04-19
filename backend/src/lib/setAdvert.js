export const setAdvert = (advert) => {
  return {
    id: foundAdvert._id,
    name: foundAdvert.name,
    description: foundAdvert.description,
    price: foundAdvert.price,
    sale: foundAdvert.sale,
    image: foundAdvert.image,
    tags: foundAdvert.tags.map((tag) => ({ id: tag._id, name: tag.name })),
    owner: {
      id: foundAdvert.owner._id,
      username: foundAdvert.owner.username,
    },
    favorites: foundAdvert.favorites.map((user) => ({
      id: user._id,
      username: user.username,
    })),
    createdAt: foundAdvert.createdAt,
    updatedAt: foundAdvert.updatedAt,
  };
};
