/*  Connects a student to the teacher in charge of the least number of students.

    PARAMS
      sockets (object)
      user (object): has to be a student user
      emitter (object): has to be a student emitter

    RETURN
      none
*/
const connectToUnderloadedTeacher = (sockets, user, emitter) => {
  let teacherId = getUnderloadedTeacherId(sockets, user.roomId);
  if (teacherId === null) {
    delete emitter.recipient;
    return;
  }
  emitter.recipient = teacherId;

  let teacher = getEmitter(sockets, { roomId: user.roomId, type: 'teacher', userId: teacherId });
  if (teacher === null) { return; }

  teacher.load++;
  const controllers = require('../database/controllers');
  controllers.conversations.retrieveMessagesById(user.userId, conversation => {
    let messages = [];
    conversation.forEach( obj => {
      messages.push(JSON.parse(obj.message));
    });

    teacher.socket.emit(
      'new-student',
      {
        student: { id: user.userId, name: emitter.name },
        messages
      }
    );
  });
};

/*  Returns the number of connected teachers in a room.

    PARAMS
      sockets (object)
      roomId (string): id of the room

    RETURN
      the number of connected teachers in the room
*/
const countTeachers = (sockets, roomId) => {
  return Object.keys(sockets[roomId]['teacher']).length;
};

/*  Returns the client associated to the given id.

    PARAMS
      sockets (object)
      user (object)

    RETURN
      the client object or null if not found
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

const getUnderloadedTeacherId = (sockets, roomId) => {
  let teachers = Object.keys(sockets[roomId]['teacher']);
  if (teachers.length === 0) { return null; }

  let minLoad = 100;
  let underloadedId;
  teachers.forEach(id => {
    let load = sockets[roomId]['teacher'][id].load;
    if (load < minLoad) {
      underloadedId = id;
      minLoad = load;
    }
  });

  return underloadedId;
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
  connectToUnderloadedTeacher,
  countTeachers,
  getEmitter,
  getEmitterAndRecipient,
  getUnderloadedTeacherId,
  isStudent,
  isTeacher,
  mirrorType,
  strUser
};
