const utils = require('../utils');
let sockets = require('../sockets');

const disconnect = (user) => {
  let emitter = utils.getEmitter(sockets, user);
  if (emitter === null) { return; }

  console.log(`${utils.strUser(user)} disconnected`);

  Object.keys(sockets[user.roomId]['student']).forEach(id => {
    let student = sockets[user.roomId]['student'][id];
    if (student.recipient && student.recipient === user.userId) {
      delete student.recipient;
    }
  })

  delete sockets[user.roomId][user.type][user.userId];
  if (user.type === 'student') {
    utils.broadcastTeachers(sockets, user.roomId, 'del-student', { student: [ user.userId ] });
  }
};

module.exports = disconnect;
