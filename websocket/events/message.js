const utils = require('../utils');
let sockets = require('../sockets');

const init = (data, user) => {
  let emitter = utils.getClient(sockets, user);
  if (emitter === null) {
    return;
  }

  let recipientType = user.type === 'student' ? 'teacher' : 'student';
  let recipient = utils.getClient(sockets, { userId: emitter.recipient, roomId: user.roomId, type: recipientType });
  if (recipient === null) {
    return;
  }

  console.log(`${user.type} ${emitter.name} ${user.userId} sends message to ${recipientType} ${recipient.name} ${emitter.recipient}`);
  let message = {
    emitter: user.userId,
    emitterType: user.type,
    recipient: emitter.recipient,
    message: {
      type: 'text',
      payload: data.payload
    }
  };

  emitter.socket.emit('message', message);
  recipient.socket.emit('message', message);
};

module.exports = init;
