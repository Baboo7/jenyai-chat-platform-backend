const roomManager = require('../managers/room');
const userManager = require('../managers/user');
const mailer = require('../../utils/mailer');
let sockets = require('../sockets');

/*  Initializes a user in the socket object.

    PARAMS
      socket (object): socket freshly created
      decryptedToken (Token Object): object from the decrypted token. See crypto module for information on Token Object structure

    RETURN
      none
*/
const init = (socket, decryptedToken) => {
  roomManager.doesExistInDb(decryptedToken.roomName, room => {
    if (room === null) { return; }

    let user = userManager.createUser(
      decryptedToken.userType,  // type
      decryptedToken.roomName,  // room
      null,                     // recipient
      decryptedToken.userName,  // name
      socket                    // socket
    );
    if (user === null) return;

    sockets[socket.id] = user;
    socket.emit('init', { id: socket.id });

    let nbTeachers = roomManager.countTeachers(sockets, user.room);
    if (userManager.isStudent(user)) {
      if (nbTeachers === 0) {

        // Activate agent for student
        user.discussWithAgent = true;

        // Warn teachers a student needs help
        let mailData = {
          roomName: user.room ,
          studentName: user.name
        };

        mailer.sendMail(room.teachers, 'new-student', mailData);
      } else {
        userManager.connectToUnderloadedTeacher(sockets, user);
      }
    } else if (userManager.isTeacher(user)) {
      if (nbTeachers === 1) {
        Object.keys(sockets).forEach(socketId => {
          let u = userManager.getEmitter(sockets, socketId);
          if (userManager.inSameRoom(u, user) && userManager.isStudent(u)) {
            userManager.connectToUnderloadedTeacher(sockets, u);
          }
        });
      }
    }
  });
};

module.exports = init;
