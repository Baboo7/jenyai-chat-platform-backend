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

  let emitter = { name, socket };
  if (emitterType === 'student') {
    utils.connectToUnderloadedTeacher(sockets, user, emitter);
  } else if (emitterType === 'teacher') {
    emitter.load = 0;
  }

  sockets[roomId][emitterType][user.userId] = emitter;
};

module.exports = init;
