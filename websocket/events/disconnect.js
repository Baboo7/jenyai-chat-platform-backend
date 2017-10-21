const userManager = require('../managers/user');
let sockets = require('../sockets');

/*  Disconnects a client.

    PARAMS
      socketId (string): socket id

    RETURN
      none
*/
const disconnect = (socketId) => {
  let user = userManager.getEmitter(sockets, socketId);
  if (user === null) { return; }

  userManager.deleteEmitter(sockets, user.socket.id);

  if (userManager.isStudent(user)) {
    let teacherEmitter = userManager.getEmitter(sockets, user.recipient);
    if (teacherEmitter !== null) {
      teacherEmitter.load--;
      teacherEmitter.socket.emit('del-student', { student: user.socket.id });
    }
  } else if (userManager.isTeacher(user)) {
    Object.keys(sockets).forEach(id => {
      let u = userManager.getEmitter(sockets, id);
      if (u.room === user.room && userManager.isStudent(u) && u.recipient && u.recipient === user.socket.id) {
        userManager.connectToUnderloadedTeacher(sockets, u.socket.id);
      }
    });
  }
};

module.exports = disconnect;
