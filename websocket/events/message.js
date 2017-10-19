const userManager = require('../managers/user');
const parser = require('../message-parser');
let sockets = require('../sockets');

const message = (data, user) => {
  let emitter = userManager.getEmitter(sockets, user);
  if (emitter === null) {
    return;
  }

  let recipientType = userManager.isStudent(user) ? 'teacher' : 'student';
  let recipient = userManager.getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: recipientType });
  if (userManager.isTeacher(user) && recipient === null) { return; }

  let msg = parser(data, user, emitter);
  if (msg === null) {
    console.error(`empty message from ${userManager.strUser(user)}`);
    return;
  }

  emitter.socket.emit('message', msg);
  if (recipient !== null) { recipient.socket.emit('message', msg); }

  let studentUuid = userManager.isStudent(user) ? user.userId : emitter.recipient;
  const controllers = require('../../database/controllers');

  user.timestamp = msg.timestamp;
  controllers.conversations.addMessage(studentUuid, user.timestamp, msg);
};

module.exports = message;
