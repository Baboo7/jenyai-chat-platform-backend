const utils = require('../utils');
let sockets = require('../sockets');

const init = (data, user) => {
  let client = utils.getClient(sockets, user);
  if (client === null) {
    return;
  }
  console.log(`message received from ${user.type} ${user.userId}: `, data);

  if (user.type === 'student') {
    Object.keys(sockets[user.roomId]['teacher']).forEach(id => {
      sockets[user.roomId]['teacher'][id].socket.emit('message',
      {
        emitter: user.userId,
        message: {
          type: 'text',
          payload: data.payload
        }
      });
    });
  } else if (user.type === 'teacher') {
    if (data.recipient) {
      let student = sockets[user.roomId]['student'][data.recipient];
      if (student !== undefined) {
        student.socket.emit('message',
        {
          emitter: user.userId,
          message: {
            type: 'text',
            payload: data.payload
          }
        });
      }
    }
  }
};

module.exports = init;
