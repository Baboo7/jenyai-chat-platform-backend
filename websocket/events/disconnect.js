const utils = require('../utils');
let sockets = require('../sockets');

const disconnect = (user) => {
  let emitter = utils.getEmitter(sockets, user);
  if (emitter === null) { return; }

  console.log(`${utils.strUser(user)} disconnected`);
  delete sockets[user.roomId][user.type][user.userId];

  if (utils.isTeacher(user)) {
    Object.keys(sockets[user.roomId]['student']).forEach(studentId => {
      let student = sockets[user.roomId]['student'][studentId];

      if (student.recipient && student.recipient === user.userId) {
        utils.connectToUnderloadedTeacher(sockets, { roomId: user.roomId, type: 'student', userId: studentId }, student);
      }
    });
  }
};

module.exports = disconnect;
