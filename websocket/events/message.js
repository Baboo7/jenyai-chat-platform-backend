const utils = require('../utils');
let sockets = require('../sockets');

const init = (data, user) => {
  let client = utils.getClient(sockets, user);
  if (client === null) {
    return;
  }
  console.log(`message received from ${user.type} ${user.userId}: `, data);

  if (user.type === 'student') {
    let message = {
      emitter: user.userId,
      emitterType: user.type,
      message: {
        type: 'text',
        payload: data.payload
      }
    };
    sockets[user.roomId][user.type][user.userId].socket.emit('message', message);
    Object.keys(sockets[user.roomId]['teacher']).forEach(id => {
      sockets[user.roomId]['teacher'][id].socket.emit('message', message);
    });
  } else if (user.type === 'teacher') {
    if (data.recipient) {
      let message = {
        emitter: user.userId,
        emitterType: user.type,
        recipient: data.recipient,
        message: {
          type: 'text',
          payload: data.payload
        }
      };
      let student = sockets[user.roomId]['student'][data.recipient];
      if (student !== undefined) {
        student.socket.emit('message', message);
        sockets[user.roomId][user.type][user.userId].socket.emit('message', message);
      }
    }
  }
};

module.exports = init;
