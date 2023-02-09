const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user.id,
    role: user.role,
    email: user.email,
    organizer: user.organizer,
  };
};

const createTokenParticipant = (participant) => {
  return {
    participantId: participant._id,
    firstName: participant.firstName,
    lastName: participant.lastName,
    email: participant.email,
  };
};

module.exports = { createTokenUser, createTokenParticipant };
