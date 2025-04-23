export const setUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    chats: user.chats,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
