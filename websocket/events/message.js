const controllers = require('../../database/controllers');
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
  let msg = messenger(sockets, user, data, recipient);

  // Save message in database
  if (msg !== null) {
    let studentUuid = userManager.isStudent(user) ? user.socket.id : user.recipient;

    msg.emitterName = user.name;
    msg.room = user.room;
    if (recipient !== null) {
      msg.recipientType = recipient.type;
      msg.recipientName = recipient.name;
    }

    controllers.conversations.addMessage(studentUuid, user.timestamp, msg);
  }
};

module.exports = message;
