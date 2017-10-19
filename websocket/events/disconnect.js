const userManager = require('../managers/user');
let sockets = require('../sockets');

const disconnect = (user) => {
  let emitter = userManager.getEmitter(sockets, user);
  if (emitter === null) { return; }

  console.log(`${userManager.strUser(user)} disconnected`);
  delete sockets[user.roomId][user.type][user.userId];

  if (userManager.isStudent(user)) {
    let teacherEmitter = userManager.getEmitter(sockets, { roomId: user.roomId, userId: emitter.recipient, type: 'teacher' });
    if (teacherEmitter !== null) {
      teacherEmitter.load--;
      teacherEmitter.socket.emit('del-student', { student: user.userId });
    }
  } else if (userManager.isTeacher(user)) {
    Object.keys(sockets[user.roomId]['student']).forEach(studentId => {
      let student = sockets[user.roomId]['student'][studentId];

      if (student.recipient && student.recipient === user.userId) {
        userManager.connectToUnderloadedTeacher(sockets, { roomId: user.roomId, type: 'student', userId: studentId }, student);
      }
    });
  }
};

module.exports = disconnect;
