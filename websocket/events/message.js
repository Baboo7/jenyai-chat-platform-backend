'use strict';

const messenger = require('../../messenger');
const userManager = require('../managers/user');
let sockets = require('../sockets');

/*  Message types:

    > 'text'

    payload (object)
      text (string)
      media (string): the way the message has been entered
*/

/*  Transmits a message from one client to an other.

    PARAMS
      data (object): object sent by the client. It must contain
        type (string): message type
        payload (object): information contained depends on message type (see above)
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
