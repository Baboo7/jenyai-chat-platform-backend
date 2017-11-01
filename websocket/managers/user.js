const conversationsCtrl = require('../../database/controllers/conversations');
const adaptors = require('../../messenger/adaptors');

/*  Connect a student to the teacher in charge of the least number of students.

    PARAMS
      sockets (object)
      user (object): has to be a student user

    RETURN
      none
*/
const connectToUnderloadedTeacher = (sockets, user) => {
  let teacherId = getUnderloadedTeacherId(sockets, user.room);
  if (teacherId === null) {
    delete user.recipient;

    // Activate agent for student
    user.discussWithAgent = true;

    return;
  }

  let teacher = getEmitter(sockets, teacherId);
  if (teacher === null) {
    delete user.recipient;

    // Activate agent for student
    user.discussWithAgent = true;

    return;
  }

  // Connect student to teacher
  user.recipient = teacherId;
  user.discussWithAgent = false;

  teacher.load++;

  // Send previous messages to teacher
  conversationsCtrl.retrieveMessagesById(user.socket.id, conversation => {
    let messages = [];
    conversation.forEach( obj => {
      messages.push(adaptors.fromUserToUser(JSON.parse(obj.message), teacher));
    });

    let msg = {
      student: {
        id: user.socket.id,
        name: user.name
      },
      messages: messages
    };

    teacher.socket.emit('new-student', msg);
  });
};

/*  Returns the client associated to the given id.

    PARAMS
      sockets (object)
      socketId (number): id of the emitter

    RETURN
      (object): the client object or null if not found
*/
const getEmitter = (sockets, socketId) => {
  let client = sockets[socketId];
  if (!client) { client = null; }
  return client;
};

/*  Returns the client associated to the given id and its recipient.

    PARAMS
      sockets (object)
      socketId (number): id of the emitter

    RETURN
      (object)
        emitter (object): the emitter object or null if not found
        recipient (object): the recipient object or null if not found
*/
const getEmitterAndRecipient = (sockets, socketId) => {
  let emitter = getEmitter(sockets, socketId);
  if (!emitter) { return { emitter: null, recipient: null }; }
  let recipient = getEmitter(sockets, emitter.recipient);

  return { emitter: emitter, recipient: recipient };
};

/*  Deletes an emitter.

    PARAMS
      sockets (object)
      socketId (number): id of the emitter

    RETURN
      none
*/
const deleteEmitter = (sockets, socketId) => {
  delete sockets[socketId];
};

/*  Retrieves the id of the teacher in charge of the least number of students.

    PARAMS
      sockets (object)
      room (string): room in which to perform the search

    RETURN
      (number): the teacher's id or null if no teacher is connected
*/
const getUnderloadedTeacherId = (sockets, room) => {
  // retrieve all teachers connected to the room
  let teachers = [ ];
  Object.keys(sockets).forEach(socketId => {
    let u = sockets[socketId];
    if (u.room === room && isTeacher(u)) {
      teachers.push(u);
    }
  });
  if (teachers.length === 0) { return null; }

  // find the under loaded one
  let minLoad = 10000;
  let underloadedId = null;
  teachers.forEach(teacher => {
    let load = teacher.load;
    if (load < minLoad) {
      underloadedId = teacher.socket.id;
      minLoad = load;
    }
  });

  return underloadedId;
};

/*  Create a user agent.

    PARAMS
      room (string): name of the room the agent belongs to
      recipient (string): id of the recipient

    RETURN
      (object): user agent
*/
const createAgent = (room, recipient) => {
  return {
    name: 'JenyAI',
    type: 'agent',
    room: room,
    recipient: recipient
  };
};

/*  Create a student.

    PARAMS
      room (string): name of the room the student belongs to
      recipient (array): id of the recipient
      name (string): name of the student
      socket (object)

    RETURN
      (object): student user
*/
const createStudent = (room, recipient, name, socket) => {
  return {
    name: name,
    type: 'student',
    room: room,
    socket: socket,
    recipient: recipient,
    discussWithAgent: false
  };
};

/*  Create a teacher.

    PARAMS
      room (string): name of the room the teacher belongs to
      recipient (array): id of the recipient
      name (string): name of the teacher
      socket (object)

    RETURN
      (object): teacher user
*/
const createTeacher = (room, recipient, name, socket) => {
  return {
    name: name,
    type: 'teacher',
    room: room,
    socket: socket,
    recipient: recipient,
    load: 0
  };
};

/*  Create a user.

    PARAMS
      type (string): type of the user
      room (string): name of the room the user belongs to
      recipient (string): id of the recipient
      name (string): name of the user
      socket (object)

    RETURN
      (object): teacher user
*/
const createUser = (type, room, recipient, name, socket) => {
  if (type === 'student') {
    return createStudent(room, recipient, name, socket);
  } else if (type === 'teacher') {
    return createTeacher(room, recipient, name, socket);
  } else if (type === 'agent') {
    return createAgent(room, recipient);
  }

  return null;
};

/*  Indicates if the user is an agent.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if agent, false otherwise
*/
const isAgent = user => {
  if (!user) return false;

  return user.type === 'agent';
};

/*  Indicates if the user is a student.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if student, false otherwise
*/
const isStudent = user => {
  if (!user) return false;

  return user.type === 'student';
};

/*  Indicates if the user is a teacher.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if teacher, false otherwise
*/
const isTeacher = user => {
  if (!user) return false;

  return user.type === 'teacher';
};

/*  Indicate if the user is a student or a teacher.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if student or teacher, false otherwise
*/
const isHuman = user => {
  return isStudent(user) || isTeacher(user);
};

/*  Indicate if the users are in the same room.

    PARAMS
      u1 (object): path to the user in the socket object
      u2 (object): path to the user in the socket object

    RETURN
      (boolean): true if same room, false otherwise
*/
const inSameRoom = (u1, u2) => {
  return u1.room === u2.room;
};

/*  Stringifies a user.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (string): the user stringified
*/
const strUser = user => {
  return `${user.name} (${user.type}, ${user.socket.id})`;
};

module.exports = {
  createAgent,
  createStudent,
  createTeacher,
  createUser,
  connectToUnderloadedTeacher,
  getEmitter,
  getEmitterAndRecipient,
  deleteEmitter,
  getUnderloadedTeacherId,
  isAgent,
  isStudent,
  isTeacher,
  isHuman,
  inSameRoom,
  strUser
};
