export const setAdvert = (advert) => {
  return {
    id: advert._id,
    name: advert.name,
    description: advert.description,
    price: advert.price,
    sale: advert.sale,
    image: advert.image,
    tags: advert.tags.map((tag) => ({ id: tag._id, name: tag.name })),
    owner: {
      id: advert.owner._id,
      username: advert.owner.username,
    },
    favorites: advert.favorites.map((user) => ({
      id: user._id,
      username: user.username,
    })),
    createdAt: advert.createdAt,
    updatedAt: advert.updatedAt,
  };
};
