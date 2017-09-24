/*  Creates a new classroom in the sockets object.
*/
const createClassroom = () => {
  return {
    student: { },
    teacher: { }
  }
};

/*  Deletes a classroom.
*/
const deleteClassroom = (sockets, roomId) => {
  delete sockets[roomId];
};

/*  Returns the client associated to the given id.
    params:
      sockets (object)
      user (object)
    return: the client object or null if not found
*/
const getClient = (sockets, user) => {
  let client = null;
  if (sockets[user.roomId]
    && sockets[user.roomId][user.type]
    && sockets[user.roomId][user.type][user.userId]) {
    client = sockets[user.roomId][user.type][user.userId];
  } else {
    console.error(`no client found for [${user.roomId}][${user.type}][${user.userId}]`);
  }

  return client;
};

const strUser = user => {
  return `[${user.roomId}][${user.type}][${user.userId}]`;
};

module.exports = {
  createClassroom,
  deleteClassroom,
  getClient,
  strUser
};
