'use strict';

const messenger = require('../../messenger');
const userManager = require('../managers/user');
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

  // Retrieve emitter and recipient
  let user = userManager.getEmitter(sockets, socketId);
  if (user === null) { return; }

  let recipient = userManager.getEmitter(sockets, user.recipient);

  // Send message
  messenger.sendMessage(sockets, user, data, recipient);
};

module.exports = message;
