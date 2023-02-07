const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user.id,
    role: user.role,
    email: user.email,
    organizer: user.organizer,
  };
};

module.exports = createTokenUser;
