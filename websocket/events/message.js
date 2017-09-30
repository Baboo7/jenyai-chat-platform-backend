const utils = require('../utils');
let sockets = require('../sockets');

const init = (data, user) => {
  let emitter = utils.getEmitter(sockets, user);
  if (emitter === null) {
    return;
  }

  let recipientType = utils.isStudent(user) ? 'teacher' : 'student';
  let recipient = utils.getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: recipientType });
  if (utils.isTeacher(user) && recipient === null) { return; }

  let timestamp = new Date();
  let message = {
    emitter: user.userId,
    emitterType: user.type,
    recipient: emitter.recipient,
    timestamp,
    message: {
      type: 'text',
      payload: data.payload
    }
  };

  emitter.socket.emit('message', message);
  if (recipient !== null) { recipient.socket.emit('message', message); }

  let studentUuid = utils.isStudent(user) ? user.userId : emitter.recipient;
  const controllers = require('../../database/controllers');

  user.timestamp = timestamp;
  controllers.conversations.addMessage(studentUuid, timestamp, message);
};

module.exports = init;
