const utils = require('../utils');
let sockets = require('../sockets');

const init = (data, socket, user) => {
  let emitterType = data.emitterType;
  let name = data.name;
  let roomId = data.roomId;

  if (['student', 'teacher'].indexOf(emitterType) === -1) {
    console.error(`unexpected emitter type ${emitterType}`);
    return;
  }

  if (sockets[roomId] === undefined) {
    console.error(`room ${roomId} not found`);
    return;
  }

  user.type = emitterType;
  user.roomId = roomId;

  console.log(`new ${emitterType} ${name} (${user.userId}) connected to room ${roomId}`);

  sockets[roomId][emitterType][user.userId] = { name, socket };
  let emitter = sockets[roomId][emitterType][user.userId];
  if (utils.isStudent(user)) {
    utils.connectToUnderloadedTeacher(sockets, user, emitter);
  } else if (utils.isTeacher(user)) {
    emitter.load = 0;

    if (utils.countTeachers(sockets, roomId) === 1) {
      Object.keys(sockets[roomId]['student']).forEach( id => {
        let studentUser = { roomId, userId: id, type: 'student' };
        console.log(studentUser);
        let studentEmitter = utils.getEmitter(sockets, studentUser);
        utils.connectToUnderloadedTeacher(sockets, studentUser, studentEmitter);
      });
    }
  }
};

module.exports = init;
