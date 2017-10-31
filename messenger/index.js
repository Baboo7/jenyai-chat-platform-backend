'use strict';

const controllers = require('../database/controllers');
const userManager = require('../websocket/managers/user');
const parsers = require('./parsers');
const adaptors = require('./adaptors');

/*  Send a message from an emitter to a recipient.

    PARAMS
      sockets (object): contains all the active sockets
      user (object): emitter - object from the socket object
      data (object): message to send
      recipient (object): recipient - object from the socket object

    RETURN
      none
*/
const sendMessage = (sockets, user, data, recipient) => {

  // Triggers

  if (userManager.isTeacher(user) && recipient === null) { return; }

  // Parsing

  let msg = parsers.platform.parser(data, user);
  if (msg === null) { return; }

  // Sending

  user.socket.emit('message', adaptors.fromUserToUser(msg, user));
  if (recipient !== null) { recipient.socket.emit('message', adaptors.fromUserToUser(msg, recipient)); }

  user.timestamp = msg.timestamp;

  // Storing

  let studentUuid = userManager.isStudent(user) ? user.socket.id : user.recipient;

  msg.emitterName = user.name;
  msg.room = user.room;
  if (recipient !== null) {
    msg.recipientType = recipient.type;
    msg.recipientName = recipient.name;
  }

  controllers.conversations.addMessage(studentUuid, user.timestamp, msg);
};

module.exports = {
  sendMessage
};
