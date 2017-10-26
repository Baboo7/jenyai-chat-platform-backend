const controllers = require('../../database/controllers');
const userManager = require('../managers/user');
const parser = require('../messageParser').parser;
let sockets = require('../sockets');

/*  Transmits a message from one client to an other.

    PARAMS
      data (object): object sent by the client. It must contain
        payload (string): text message sent by the user
      socketId (string): socket id

    RETURN
      none
*/
const message = (data, socketId) => {
  let user = userManager.getEmitter(sockets, socketId);
  if (user === null) { return; }

  let recipient = userManager.getEmitter(sockets, user.recipient);
  if (userManager.isTeacher(user) && recipient === null) { return; }

  let msg = parser(data, user);
  if (msg === null) { return; }

  user.socket.emit('message', msg);
  if (recipient !== null) { recipient.socket.emit('message', msg); }

  let studentUuid = userManager.isStudent(user) ? user.socket.id : user.recipient;

  user.timestamp = msg.timestamp;

  msg.emitterName = user.name;
  msg.room = user.room;
  if (recipient !== null) {
    msg.recipientType = recipient.type;
    msg.recipientName = recipient.name;
  }

  controllers.conversations.addMessage(studentUuid, user.timestamp, msg);
};

module.exports = message;
