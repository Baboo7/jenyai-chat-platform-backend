const broadcastTeachers = (sockets, roomId, event, message) => {
  Object.keys(sockets[roomId]['teacher']).forEach(id => {
    sockets[roomId]['teacher'][id].socket.emit(event, message);
    // sockets[user.roomId]['teacher'][id].socket.emit('del-student', { student: [ user.userId ] });
  });
};

/*  Returns the client associated to the given id.
    params:
      sockets (object)
      user (object)
    return: the client object or null if not found
*/
const getEmitter = (sockets, user) => {
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

const getEmitterAndRecipient = (sockets, user) => {
  let emitter = getEmitter(sockets, user);
  if (emitter === null) { return { emitter: null, recipient: null }; }
  let recipient = getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: mirrorType(user) });

  return { emitter, recipient };
};

const isStudent = user => {
  return user.type === 'student';
};

const isTeacher = user => {
  return user.type === 'teacher';
};

const mirrorType = user => {
  return user.type === 'student' ? 'teacher' : 'student';
};

const strUser = user => {
  return `[${user.roomId}][${user.type}][${user.userId}]`;
};

module.exports = {
  broadcastTeachers,
  getEmitter,
  getEmitterAndRecipient,
  isStudent,
  isTeacher,
  mirrorType,
  strUser
};
