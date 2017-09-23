const utils = require('../utils');
let sockets = require('../sockets');

const init = (data, id) => {
  let client = utils.getClient(sockets, id);
  if (client === null) {
    return;
  }
  console.log(`message received from ${client.emitterType} ${id}: `, data);

  if (client.emitterType === 'student') {
    Object.keys(sockets.teachers).forEach(teacherId => {
      sockets.teachers[teacherId].socket.emit('message',
      {
        emitter: id,
        message: {
          type: 'text',
          payload: data.payload
        }
      });
    });
  } else if (client.emitterType === 'teacher') {
    if (data.recipient) {
      let student = sockets.students[data.recipient];
      if (student !== undefined) {
        student.socket.emit('message',
        {
          emitter: id,
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
