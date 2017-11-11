let userManager = { };

module.exports = userManager;

const conversationsCtrl = require('../../database/controllers/conversations');
const adaptors = require('../../messenger/adaptors');
const roomManager = require('./room');

/*  Get a student from the teacher in charge of the highest number of students.

    PARAMS
      sockets (object)
      room (string): room name to perform the search into

    RETURN
      (object) a student or undefined if not found
*/
userManager.getStudentFromOverloadedTeacher = (sockets, room) => {
  // Retrieve the most overloaded teacher
  let teacher = userManager.getEmitter(
    sockets,
    userManager.getOverloadedTeacherId(sockets, room)
  );
  if (teacher === null) { return; }

  // Select one student from the ones associated to the most overloaded teacher
  // that is not the student the teacher is currently talking to
  let classroom = roomManager.getTeacherClassroom(sockets, teacher);

  return classroom.find(s => s.socket.id !== teacher.recipient);
};

/*  Connect a student to the teacher in charge of the least number of students.

    PARAMS
      sockets (object)
      user (object): has to be a student user

    RETURN
      none
*/
userManager.connectToUnderloadedTeacher = (sockets, user) => {
  let teacherId = userManager.getUnderloadedTeacherId(sockets, user.room);
  if (teacherId === null) {
    delete user.recipient;

    // Activate agent for student
    user.discussWithAgent = true;

    return;
  }

  let teacher = userManager.getEmitter(sockets, teacherId);
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
    let messages = [ ];
    conversation.forEach( obj => {
      messages.push(JSON.parse(obj.message));
    });

    let socketMsg = {
      student: {
        id: user.socket.id,
        name: user.name,
        discussWithAgent: user.discussWithAgent
      },
      messages: adaptors.fromUserToUser(messages, teacher)
    };

    teacher.socket.emit('student-connected', socketMsg);
  });
};

/*  Disconnect a student from its current teacher.

    PARAMS
      sockets (object)
      student (object)

    RETURN
      none
*/
userManager.disconnectStudent = (sockets, student) => {
  let teacher = userManager.getEmitter(sockets, student.recipient);
  if (teacher !== null) {
    teacher.load--;

    let msg = { student: student.socket.id };

    teacher.socket.emit('student-disconnected', msg);
  }
};

/*  Returns the client associated to the given id.

    PARAMS
      sockets (object)
      socketId (number): id of the emitter

    RETURN
      (object): the client object or null if not found
*/
userManager.getEmitter = (sockets, socketId) => {
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
userManager.getEmitterAndRecipient = (sockets, socketId) => {
  let emitter = userManager.getEmitter(sockets, socketId);
  if (!emitter) { return { emitter: null, recipient: null }; }
  let recipient = userManager.getEmitter(sockets, emitter.recipient);

  return { emitter: emitter, recipient: recipient };
};

/*  Deletes an emitter.

    PARAMS
      sockets (object)
      socketId (number): id of the emitter

    RETURN
      none
*/
userManager.deleteEmitter = (sockets, socketId) => {
  delete sockets[socketId];
};

/*  Retrieve the id of the teacher in charge of the highest number of students.

    PARAMS
      sockets (object)
      room (string): room in which to perform the search

    RETURN
      (string): the teacher's id or null if no teacher is found
*/
userManager.getOverloadedTeacherId = (sockets, room) => {
  // retrieve all teachers connected to the room
  let teachers = roomManager.getTeachers(sockets, room);
  if (teachers.length === 0) { return null; }

  // find the over loaded teacher
  let maxLoad = 0;
  let id = null;
  teachers.forEach(teacher => {
    let load = teacher.load;
    if (load > maxLoad) {
      id = teacher.socket.id;
      maxLoad = load;
    }
  });

  return id;
};

/*  Retrieves the id of the teacher in charge of the least number of students.

    PARAMS
      sockets (object)
      room (string): room in which to perform the search

    RETURN
      (number): the teacher's id or null if no teacher is connected
*/
userManager.getUnderloadedTeacherId = (sockets, room) => {
  // retrieve all teachers connected to the room
  let teachers = roomManager.getTeachers(sockets, room);

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
userManager.createAgent = (room, recipient) => {
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
userManager.createStudent = (room, recipient, name, socket) => {
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
userManager.createTeacher = (room, recipient, name, socket) => {
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
userManager.createUser = (type, room, recipient, name, socket) => {
  if (type === 'student') {
    return userManager.createStudent(room, recipient, name, socket);
  } else if (type === 'teacher') {
    return userManager.createTeacher(room, recipient, name, socket);
  } else if (type === 'agent') {
    return userManager.createAgent(room, recipient);
  }

  return null;
};

/*  Indicates if the user is an agent.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if agent, false otherwise
*/
userManager.isAgent = user => {
  if (!user) return false;

  return user.type === 'agent';
};

/*  Indicates if the user is a student.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if student, false otherwise
*/
userManager.isStudent = user => {
  if (!user) return false;

  return user.type === 'student';
};

/*  Indicates if the user is a teacher.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if teacher, false otherwise
*/
userManager.isTeacher = user => {
  if (!user) return false;

  return user.type === 'teacher';
};

/*  Indicate if the user is a student or a teacher.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (boolean): true if student or teacher, false otherwise
*/
userManager.isHuman = user => {
  return userManager.isStudent(user) || userManager.isTeacher(user);
};

/*  Indicate if the user is in the specified room.

    PARAMS
      user (object): path to the user in the socket object
      room (string): name of the room

    RETURN
      (boolean): true if in the room, false otherwise
*/
userManager.isInRoom = (user, room) => {
  return user.room === room;
};

/*  Indicate if the users are in the same room.

    PARAMS
      u1 (object): path to the user in the socket object
      u2 (object): path to the user in the socket object

    RETURN
      (boolean): true if same room, false otherwise
*/
userManager.inSameRoom = (u1, u2) => {
  return u1.room === u2.room;
};

/*  Stringifies a user.

    PARAMS
      user (object): path to the user in the socket object

    RETURN
      (string): the user stringified
*/
userManager.strUser = user => {
  return `${user.name} (${user.type}, ${user.socket.id})`;
};
