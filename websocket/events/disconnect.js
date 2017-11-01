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

      let msg = { student: user.socket.id };

      teacherEmitter.socket.emit('del-student', msg);
    }
  } else if (userManager.isTeacher(user)) {
    Object.keys(sockets).forEach(id => {
      let u = userManager.getEmitter(sockets, id);
      if (userManager.inSameRoom(u, user) && userManager.isStudent(u) && u.recipient && u.recipient === user.socket.id) {
        userManager.connectToUnderloadedTeacher(sockets, u);
      }
    });
  }
};

module.exports = disconnect;
