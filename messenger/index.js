'use strict';

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
      (object): message sent to the recipient
*/
const messenger = (sockets, user, data, recipient) => {

  if (userManager.isTeacher(user) && recipient === null) { return null; }

  let msg = parsers.platform.parser(data, user);
  if (msg === null) { return null; }

  user.socket.emit('message', adaptors.fromUserToUser(msg, user));
  if (recipient !== null) { recipient.socket.emit('message', adaptors.fromUserToUser(msg, recipient)); }

  user.timestamp = msg.timestamp;

  return msg;
};

module.exports = messenger;
