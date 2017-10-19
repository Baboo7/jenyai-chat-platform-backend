const conversationsCtrl = require('../../database/controllers/conversations');

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

  conversationsCtrl.retrieveMessagesById(user.userId, conversation => {
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

/*  Returns the client associated to the given id.

    PARAMS
      sockets (object)
      user (object): path to the user in the socket object

    RETURN
      (object): the client object or null if not found
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

/*  Returns the client associated to the given id and its recipient.

    PARAMS
      sockets (object)
      user (object): path to the user in the socket object

    RETURN
      (object)
        emitter (object): the emitter object or null if not found
        recipient (object): the recipient object or null if not found
*/
const getEmitterAndRecipient = (sockets, user) => {
  let emitter = getEmitter(sockets, user);
  if (emitter === null) { return { emitter: null, recipient: null }; }
  let recipient = getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: mirrorType(user) });

  return { emitter, recipient };
};

/*  Retrieves the id of the teacher in charge of the least number of students.

    PARAMS
      sockets (object)
      roomId (string): room in which to perform the search

    RETURN
      (number): the teacher id or null if no teacher is connected
*/
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

/*  Indicates if the user is a student.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if student, false otherwise
*/
const isStudent = user => {
  return user.type === 'student';
};

/*  Indicates if the user is a teacher.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if teacher, false otherwise
*/
const isTeacher = user => {
  return user.type === 'teacher';
};

/*  Returns the opposite type of the given user.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (string): 'student' if the user is a teacher, 'teacher' if the user is a student
*/
const mirrorType = user => {
  return user.type === 'student' ? 'teacher' : 'student';
};

/*  Stringifies a user.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (string): the user stringified
*/
const strUser = user => {
  return `[${user.roomId}][${user.type}][${user.userId}]`;
};

module.exports = {
  connectToUnderloadedTeacher,
  getEmitter,
  getEmitterAndRecipient,
  getUnderloadedTeacherId,
  isStudent,
  isTeacher,
  mirrorType,
  strUser
};
