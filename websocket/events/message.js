const utils = require('../utils');
const parser = require('../message-parser');
let sockets = require('../sockets');

const message = (data, user) => {
  let emitter = utils.getEmitter(sockets, user);
  if (emitter === null) {
    return;
  }

  let recipientType = utils.isStudent(user) ? 'teacher' : 'student';
  let recipient = utils.getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: recipientType });
  if (utils.isTeacher(user) && recipient === null) { return; }

  let msg = parser(data, user, emitter);
  if (msg === null) {
    console.error(`empty message from ${utils.strUser(user)}`);
    return;
  }

  emitter.socket.emit('message', msg);
  if (recipient !== null) { recipient.socket.emit('message', msg); }

  let studentUuid = utils.isStudent(user) ? user.userId : emitter.recipient;
  const controllers = require('../../database/controllers');

  user.timestamp = msg.timestamp;
  controllers.conversations.addMessage(studentUuid, user.timestamp, msg);
};

module.exports = message;
