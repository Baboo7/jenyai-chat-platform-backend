const roomManager = require('../managers/room');
const userManager = require('../managers/user');
const mailer = require('../../utils/mailer');
let sockets = require('../sockets');

const init = (data, socket, user) => {
  let emitterType = data.emitterType;
  let name = data.name;
  let roomId = data.roomId;

  if (['student', 'teacher'].indexOf(emitterType) === -1) {
    console.error(`unexpected emitter type ${emitterType}`);
    return;
  }

  roomManager.doesExistInDb(roomId, room => {
    if (room === null) {
      return;
    }

    roomManager.createIfDoesntExistInRAM(sockets, roomId);

    user.type = emitterType;
    user.roomId = roomId;

    console.log(`new ${emitterType} ${name} (${user.userId}) connected to room ${roomId}`);

    sockets[roomId][emitterType][user.userId] = { name, socket };
    let emitter = sockets[roomId][emitterType][user.userId];
    emitter.socket.emit('init', { id: user.userId });

    let nbTeachers = roomManager.countTeachers(sockets, roomId);
    if (userManager.isStudent(user)) {
      if (nbTeachers === 0) {
        mailer.sendMail(room.teachers, 'new-student', { roomName: roomId , studentName: name });
      } else {
        userManager.connectToUnderloadedTeacher(sockets, user, emitter);
      }
    } else if (userManager.isTeacher(user)) {
      emitter.load = 0;

      if (nbTeachers === 1) {
        Object.keys(sockets[roomId]['student']).forEach( id => {
          let studentUser = { roomId, userId: id, type: 'student' };
          let studentEmitter = userManager.getEmitter(sockets, studentUser);
          userManager.connectToUnderloadedTeacher(sockets, studentUser, studentEmitter);
        });
      }
    }
  });
};

module.exports = init;
